module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleNameMapper: {
    '^lib/(.*)$': '<rootDir>/lib/$1'
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest'
  }
};
