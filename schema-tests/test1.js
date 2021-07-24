const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 10
    },
    age: {
      type: 'number'
    },
    email: {
      type: 'string',
      format: 'email'
    },
    test: {
      type: 'string',
      format: 'test'
    }
  }
};

const ajv = new Ajv();
addFormats(ajv);

ajv.addFormat('test', /^a$/); // 自定义format
const validate = ajv.compile(schema);
const valid = validate({
  name: 'ashuai-ashuai',
  email: 'qq@xx.com',
  test: 'A'
});
if (!valid) {
  console.log(validate.errors);
}
