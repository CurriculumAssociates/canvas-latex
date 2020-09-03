const mkdirp = require('mkdirp')
const dirs = [
  'test/selenium/screenshots/local/chrome/baseline',
  'test/selenium/screenshots/local/chrome/diffs',
  'test/selenium/screenshots/local/chrome/results',
  'test/selenium/screenshots/local/firefox/baseline',
  'test/selenium/screenshots/local/firefox/diffs',
  'test/selenium/screenshots/local/firefox/results',

  'test/selenium/screenshots/browserstack/chrome/baseline',
  'test/selenium/screenshots/browserstack/chrome/diffs',
  'test/selenium/screenshots/browserstack/chrome/results',
  'test/selenium/screenshots/browserstack/firefox/baseline',
  'test/selenium/screenshots/browserstack/firefox/diffs',
  'test/selenium/screenshots/browserstack/firefox/results',
  'test/selenium/screenshots/browserstack/edge/baseline',
  'test/selenium/screenshots/browserstack/edge/diffs',
  'test/selenium/screenshots/browserstack/edge/results',
  'test/selenium/screenshots/browserstack/safari/baseline',
  'test/selenium/screenshots/browserstack/safari/diffs',
  'test/selenium/screenshots/browserstack/safari/results'
]
dirs.forEach(function (dir) {
  mkdirp.sync(dir)
})
