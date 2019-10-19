module.exports = {
  setupFiles: [],
  setupFilesAfterEnv: ['<rootDir>/config/jestSetupFiles.js'],
  moduleFileExtensions: ['js', 'json', 'node'],
  moduleNameMapper: {},
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.js', '!**/node_modules/**']
};
