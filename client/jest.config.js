// jest.config.js
export default {
  testEnvironment: 'jsdom', // Use jsdom to simulate a browser environment
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest', // Use babel-jest to handle JavaScript and JSX/TSX files
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Optional: adjust based on your alias setup
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // Optional: add if you have a setup file
}
