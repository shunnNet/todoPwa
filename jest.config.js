module.exports = {
  verbose: true,
  preset: '@vue/cli-plugin-unit-jest',
  setupFilesAfterEnv: ['<rootDir>/tests/unit/setup.js'],
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  testMatch: ['<rootDir>/tests/unit/**/*.(spec|test).(js|jsx|ts|tsx)'],
  testPathIgnorePatterns: ['node_modules'],
}
