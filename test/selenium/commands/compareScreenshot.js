const util = require('util')
const gm = require('gm').subClass({ imageMagick: true })
const EventEmitter = require('events').EventEmitter

function CompareScreenshot () {
  EventEmitter.call(this)
}

util.inherits(CompareScreenshot, EventEmitter)

CompareScreenshot.prototype.command = function (filename, bounds, expected, callback) {
  const self = this
  const screenshotPath = 'test/selenium/screenshots/'
  const browser = self.api.options.desiredCapabilities.browserName.replace(' ', '_')
  const environment = self.api.globals.environment
  const updateMode = self.api.globals.updateMode
  const resultPath = screenshotPath + `${environment}/${browser}/results/` + filename
  let devicePixelRatio = 1

  self.api.execute(function () {
    return devicePixelRatio
  }, [], function (result) {
    devicePixelRatio = result.value
  })

  self.api.saveScreenshot(resultPath, function (response) {
    const ratio = devicePixelRatio
    gm(resultPath)
      .size(function (error, value) {
        if (error) throw error
        const newWidth = value.width / ratio
        const newHeight = value.height / devicePixelRatio
        gm(resultPath)
            .resize(newWidth, newHeight)
            .crop(bounds.width, bounds.height, bounds.x, bounds.y)
            .write(resultPath, function (error) {
              if (error) throw error
              self.api.assert.compareScreenshot(filename, environment, updateMode, browser, expected)
              self.emit('complete')
            })
      })
  })

  return this // allows the command to be chained.
}

module.exports = CompareScreenshot
