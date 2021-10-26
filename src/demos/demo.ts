export default {
  name: 'demo',
  schema: {
    type: 'object',
    title: 'demo',
    properties: {
      pass1: {
        type: 'string',
        minLength: 10,
        title: 'password'
      },
      pass2: {
        type: 'string',
        minLength: 10,
        title: 'repassword'
      }
    }
  },
  async customValidate(data: any, errors: any): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.pass1 !== data.pass2) {
          errors.pass2.addError('pass must be same');
        }
        resolve();
      }, 5000);
    });
  },
  default: {
    pass1: undefined,
    pass2: undefined
  },
  uiSchema: {}
};
