import { inject } from 'vue';
import { CommonFieldDefine } from './types';

export const SchemaFormContextKey = Symbol();

type Context = { SchemaItem: CommonFieldDefine };

export function useVJSFContext(): Context {
  const context: Context | undefined = inject(SchemaFormContextKey);
  if (context === undefined) {
    throw Error('SchemaForm should be used !');
  }

  return context;
}
