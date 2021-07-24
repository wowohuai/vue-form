import { defineComponent, reactive, ref, Ref, watchEffect } from 'vue';
import MonacoEditor from '@/components/monaco-editor';
import { createUseStyles } from 'vue-jss';
// import { Schema } from '../lib/types';

import demos from './demos';
import SchemaForm from '../lib';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '1200px',
    margin: '0 auto'
  },
  menu: {
    marginBottom: 20
  },
  code: {
    width: 700,
    flexShrink: 0
  },
  codePanel: {
    minHeight: 400,
    marginBottom: 20
  },
  uiAndValue: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      width: '46%'
    }
  },
  content: {
    display: 'flex'
  },
  form: {
    padding: '0 20px',
    flexGrow: 1
  },
  menuButton: {
    appearance: 'none',
    borderWidth: 0,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'inline-block',
    padding: 15,
    borderRadius: 5,
    '&:hover': {
      background: '#efefef'
    }
  },
  menuSelected: {
    background: '#337ab7',
    color: '#fff',
    '&:hover': {
      background: '#337ab7'
    }
  }
});

function toJson(data: unknown) {
  return JSON.stringify(data, null, 2);
}
// to-do  需要在lib中导出
type Schema = any;
type UISchema = any;

export default defineComponent({
  setup() {
    const selectedRef: Ref<number> = ref(0);
    const demo: {
      schema: Schema;
      data: unknown;
      uiSchema: UISchema;
      schemaCode: string;
      dataCode: string;
      uiSchemaCode: string;
    } = reactive({
      schema: null,
      data: {},
      uiSchema: {},
      schemaCode: '',
      dataCode: '',
      uiSchemaCode: ''
    });

    watchEffect(() => {
      const index = selectedRef.value;
      const d = demos[index];
      demo.schema = d.schema;
      demo.data = d.default;
      demo.uiSchema = d.uiSchema;
      demo.schemaCode = toJson(d.schema);
      demo.dataCode = toJson(d.default);
      demo.uiSchemaCode = toJson(d.uiSchema);
    });
    const handleChange = (v: any) => {
      demo.data = v;
      demo.dataCode = toJson(v);
    };

    const handleCodeChange = (
      field: 'schema' | 'data' | 'uiSchema',
      value: string
    ) => {
      try {
        const json = JSON.parse(value);
        demo[field] = json;
        (demo as any)[`${field}Code`] = value;
      } catch (err) {
        console.log(err);
      }
    };

    const handleSchemaChange = (v: string) => handleCodeChange('schema', v);
    const handleDataChange = (v: string) => handleCodeChange('data', v);
    const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v);

    const classesRef = useStyles();

    return () => {
      const classes = classesRef.value;
      const selected = selectedRef.value;

      return (
        <div class={classes.container}>
          {/* menu */}
          <div class={classes.menu}>
            <h1>Vue3 JsonSchema Form</h1>
            <div>
              {demos.map((demo, index) => (
                <button
                  class={{
                    [classes.menuButton]: true,
                    [classes.menuSelected]: index === selected
                  }}
                  onClick={() => (selectedRef.value = index)}
                >
                  {demo.name}
                </button>
              ))}
            </div>
          </div>
          {/* content */}
          <div class={classes.content}>
            <div class={classes.code}>
              <MonacoEditor
                code={demo.schemaCode}
                class={classes.codePanel}
                onChange={handleSchemaChange}
                title="Schema"
              />
              <div class={classes.uiAndValue}>
                <MonacoEditor
                  code={demo.uiSchemaCode}
                  class={classes.codePanel}
                  onChange={handleUISchemaChange}
                  title="UISchema"
                />
                <MonacoEditor
                  code={demo.dataCode}
                  class={classes.codePanel}
                  onChange={handleDataChange}
                  title="Value"
                />
              </div>
            </div>
            {/* form */}
            <div class={classes.form}>
              <SchemaForm
                schema={demo.schema}
                value={demo.data}
                onChange={handleChange}
              />
              {/* <SchemaForm
                schema={demo.schema!}
                uiSchema={demo.uiSchema!}
                onChange={handleChange}
                contextRef={methodRef}
                value={demo.data}
              /> */}
            </div>
          </div>
        </div>
      );
    };
  }
});
