const yaml = require('js-yaml')
const fs = require('fs')
const config = fs.readFileSync(require.resolve('../expressions.yml'))

const data = yaml.safeLoad(config)

module.exports = {
  'Expressions Test': function (browser) {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible('body', 1000)
      .resizeWindow(1366, 768)
      .waitForElementPresent('.web-font-loaded', 50000)
    Object.keys(data).forEach((key) => {
      browser
        .clearValue('#input')
        .setValue('#input', data[key])
        .moveToElement('#canvas', 0, 0)
        .getLocationInView('#canvas', function (loc) {
          browser.getElementSize('#canvas', function (dim) {
            const bounds = { x: loc.value.x, y: loc.value.y, width: dim.value.width, height: dim.value.height }
            browser.compareScreenshot(`${key}.png`, bounds)
          })
        })
    })
    browser.end()
  }
}
