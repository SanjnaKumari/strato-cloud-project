export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./setupTests.js'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
};


