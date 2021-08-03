import SchemaFrom from 'lib/schema-form';
import { mount } from '@vue/test-utils';
import { NumberField, ObjectField, StringField } from 'lib/fields';
import objectField from 'lib/fields/object-field';

describe('SchemaFrom', () => {
  let wrapper: any;

  let value: any = {
    name: 'ashuai'
  };
  let strField: any;
  let numField: any;

  beforeAll(() => {
    wrapper = mount(SchemaFrom, {
      props: {
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            age: { type: 'number' }
          }
        },
        rootSchema: {},
        value: value,
        onChange: (v: unknown) => {
          value = v;
        }
      }
    });
    strField = wrapper.findComponent(StringField);
    numField = wrapper.findComponent(NumberField);
  });

  it('should render properties to correct fields', async () => {
    expect(strField.exists()).toBeTruthy();
    expect(numField.exists()).toBeTruthy();
  });

  it('should change value when sub fields trigger onChange', async () => {
    await strField.props('onChange')('123');
    expect(value.name).toEqual('123');
    await numField.props('onChange')(18);
    expect(value.age).toEqual(18);
  });

  it('name should not in value when its value is undefined', async () => {
    await strField.props('onChange')(undefined);
    expect(value).not.toHaveProperty('name');
  });

  it('will return a object value when props value not a object', async () => {
    let value2;
    const wrapper2 = mount(SchemaFrom, {
      props: {
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            age: { type: 'number' }
          }
        },
        rootSchema: {},
        value: 123,
        onChange: (v: unknown) => {
          value2 = v;
        }
      }
    });

    const strField = wrapper2.findComponent(StringField);
    // await strField.props('onChange')('zzz');
    const input = strField.find('input');
    input.element.value = 'zzz';
    input.trigger('input');
    expect(value2).toMatchObject({ name: 'zzz' });
  });

  it('there has no properties', () => {
    const wrapper3 = mount(SchemaFrom, {
      props: {
        schema: {
          type: 'object'
        },
        rootSchema: {},
        value: value,
        onChange: () => {
          console.log();
        }
      }
    });

    expect(wrapper3.findComponent(StringField).exists()).toBeFalsy();
    expect(wrapper3.findComponent(NumberField).exists()).toBeFalsy();
  });
});
