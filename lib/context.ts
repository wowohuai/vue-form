import { inject } from 'vue';
import { CommonFieldDefine } from './types';
import { ErrorSchema } from './validator';

export const SchemaFormContextKey = Symbol();

export type Context = {
  SchemaItem: CommonFieldDefine;
  ErrorSchema: ErrorSchema;
};

export function useVJSFContext(): Context {
  const context: Context | undefined = inject(SchemaFormContextKey);
  if (context === undefined) {
    throw Error('SchemaForm should be used !');
  }

  return context;
}
