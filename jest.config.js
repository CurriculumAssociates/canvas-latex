module.exports = {
  setupFiles: [
    './test/unit/setup-jest.js',
    'jest-canvas-mock'
  ],
  coverageReporters: [
    'json',
    'html',
    'json-summary'
  ],
  collectCoverageFrom: [
    'src/**',
    '!src/index.js',
    '!src/common/katex.min.js'
  ],
  testEnvironment: 'jsdom'
}
