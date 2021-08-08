// import SchemaFrom from 'lib/schema-form';
import { mount } from '@vue/test-utils';
import { NumberField, StringField, ArrayField } from 'lib/fields';
import { SelectWidget } from 'lib/widgets';
import TestComponent from './utils/test-component';

describe('array-field', () => {
  it('shuold render multi type', () => {
    let value;
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: [{ type: 'string' }, { type: 'number' }]
        },
        value: [],
        onChange: (v: unknown) => {
          value = v;
        }
      }
    });

    const arr = wrapper.findComponent(ArrayField);
    const str = arr.findComponent(StringField);
    const num = arr.findComponent(NumberField);

    expect(str.exists()).toBeTruthy();
    expect(num.exists()).toBeTruthy();
  });

  it('shuold render single type', () => {
    let value;

    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: { type: 'string' }
        },
        value: ['1', '2'],
        onChange: (v: unknown) => {
          value = v;
        }
      }
    });

    const arr = wrapper.findComponent(ArrayField);
    const strs = arr.findAllComponents(StringField);

    expect(strs.length).toBe(2);
    expect(strs[1].props('value')).toBe('2');
  });

  it('shuold render select type', () => {
    let value;
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: { type: 'string', enum: ['1', '2'] }
        },
        value: value,
        onChange: (v: unknown) => {
          value = v;
        }
      }
    });

    const arr = wrapper.findComponent(ArrayField);

    const select = arr.findComponent(SelectWidget);
    expect(select.exists()).toBeTruthy();
  });
});
