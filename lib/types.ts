import { PropType } from 'vue';
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
  type: SchemaTypes | string;
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
  // vjsf?:
  required?: string[];
  enum?: unknown[];
  enumKeyValue?: unknown[];
  additionProperties?: unknown;
  additionItems?: Schema;
}

export const FieldPropsDefine = {
  schema: {
    type: Object as PropType<Schema>,
    required: true
  },
  value: {
    required: true,
    type: (Object || Number || String || Array) as PropType<any>
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true
  }
} as const;
