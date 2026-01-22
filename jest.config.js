module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverageFrom: [
    'js/**/*.js',
    'css/**/*.css',
    '!js/plugins/**',
    '!css/plugins/**'
  ],
  moduleFileExtensions: ['js', 'json'],
  verbose: true
};
