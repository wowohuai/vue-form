import { PropType, DefineComponent } from 'vue';
export enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean'
}
type SchemaRef = { $ref: string };

export interface Schema {
  type?: SchemaTypes | string;
  const?: unknown;
  format?: string;
  default?: unknown;
  properties?: {
    [key: string]: Schema | SchemaRef;
  };
  items?: Schema | Schema[] | SchemaRef;
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef;
  };
  oneOf?: Schema[];
  allOf?: Schema[];
  anyOf?: Schema[];
  // vjsf?:
  required?: string[];
  enum?: unknown[];
  enumKeyValue?: unknown[];
  additionalProperties?: any;
  additionItems?: Schema;
  $ref?: string;
  uniqueItems?: unknown;

  minLength?: number;
  maxLength?: number;
  minimun?: number;
  maximum?: number;
  multipleOf?: number;
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;
}

export const FieldPropsDefine = {
  schema: {
    type: Object as PropType<Schema>,
    required: true
  },
  value: {
    required: true,
    type: null // value 的类型为any  //https://v3.cn.vuejs.org/guide/typescript-support.html#%E6%B3%A8%E8%A7%A3-props
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true
  },
  rootSchema: {
    type: Object as PropType<Schema>,
    required: true
  }
} as const;

export type CommonFieldDefine = DefineComponent<typeof FieldPropsDefine>;

export const CommonWidgetPropsDefine = {
  value: {
    type: null
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true
  }
} as const;

export const SelectWidgetPropsDefine = {
  ...CommonWidgetPropsDefine,
  options: {
    type: Array as PropType<
      {
        key: string;
        value: any;
        label: string;
      }[]
    >,
    required: true
  }
} as const;

export type CommonWidgetDefine = DefineComponent<
  typeof CommonWidgetPropsDefine
>;

export type SelectWidgetDefine = DefineComponent<
  typeof SelectWidgetPropsDefine
>;

export enum SelectWidgetNames {
  SELECT = 'select'
  // RADIO = 'radio'
}

export enum CommonWidgetNames {
  TEXT = 'text',
  NUMBER = 'number'
}

export interface Theme {
  widget: {
    [SelectWidgetNames.SELECT]: SelectWidgetDefine;
    [CommonWidgetNames.TEXT]: CommonWidgetDefine;
    [CommonWidgetNames.NUMBER]: CommonWidgetDefine;
  };
}
