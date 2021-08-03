import SchemaFrom from 'lib/schema-form';
import { mount } from '@vue/test-utils';
import { NumberField } from 'lib/fields';

describe('SchemaFrom', () => {
  it('should render number-field correctly', async () => {
    let v: any = '';
    const wrapper = mount(SchemaFrom, {
      props: {
        schema: {
          type: 'number'
        },
        value: v,
        onChange: (value: unknown) => {
          v = value;
        }
      }
    });

    const numberField = wrapper.findComponent(NumberField);
    expect(numberField.exists()).toBeTruthy();

    const value = '123';
    const input = numberField.find('input');
    input.element.value = value;
    input.trigger('input');
    expect(v).toBe(Number(value));
    input.element.value = 'dasd';
    input.trigger('input');
    expect(v).toBe(0);
  });
});
