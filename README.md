# vue-json-schema-form

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## JSON Schema

See [JSON Schema](https://json-schema.org/understanding-json-schema/index.html)

## 需要考虑的问题

1. 易用性
2. 扩展性

### 需要的 props:

- schema

- value

- locale

- onChange

- uiSchema

- other...

```jsx
<JSONSchemaForm schema={schema} value={value} locale={locale}></JSONSchemaForm>
```

### schema

json 的格式

### value

> value 作为一个对象传入, 这里直接修改表单上的值

### onChange

> 任一表单值的改变都会触发 onChange

### locale

> 使用`ajv-i118n` 指定信息所使用的语言

### contextRef

> 传入 `vue3` 的 `Ref` 对象, 这个对象上会被挂载 `validte`方法
