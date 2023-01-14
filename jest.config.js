module.exports = {
  roots: ['<rootDir>/test'],
  testRegex: './.*\\.(test|spec)?\\.(js)$',
  moduleFileExtensions: ['js', 'json', 'node'],
  testEnvironment: '<rootDir>/test/donation-function-tests/database/custom-environment.js',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};