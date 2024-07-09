module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@testing-library|react-native-vector-icons)/)',
  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
  },
};
