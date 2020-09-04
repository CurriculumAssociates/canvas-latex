const resemble = require('node-resemble-js')
const fs = require('fs')
const colors = require('colors')

exports.assertion = function (filename, environment, updateMode, browser, expected) {
  const screenshotPath = 'test/selenium/screenshots/'
  const baselinePath = screenshotPath + `${environment}/${browser}/baseline/` + filename
  const resultPath = screenshotPath + `${environment}/${browser}/results/` + filename
  const diffPath = screenshotPath + `${environment}/${browser}/diffs/` + filename

  this.message = 'Unexpected compareScreenshot error.'
  this.expected = expected || 10   // misMatchPercentage tolerance default 2%

  this.command = function (callback) {
      // create new baseline photo if none exists
    if (!fs.existsSync(baselinePath)) {
      console.log(`${colors.yellow('WARNING:')} Baseline Photo does NOT exist.`)
      console.log('Creating Baseline Photo from Result: ' + baselinePath)
      fs.writeFileSync(baselinePath, fs.readFileSync(resultPath))
    }

    resemble
      .outputSettings({
        errorColor: {
          red: 225,
          green: 0,
          blue: 255
        },
        errorType: 'movement',
        transparency: 0.3,
        largeImageThreshold: 1200
      })

    resemble(baselinePath)
      .compareTo(resultPath)
      .ignoreAntialiasing()
      .onComplete(callback)  // calls this.value with the result

    return this
  }

  this.value = function (result) {
    result.getDiffImage().pack().pipe(fs.createWriteStream(diffPath))

    return parseFloat(result.misMatchPercentage, 10)  // value this.pass is called with
  }

  this.pass = function (value) {
    let pass = value <= this.expected
    if (updateMode === 'true' && !pass) {
      this.message = 'Screenshots for ' + filename + ' do not match the baseline,\n' +
          'UPDATE_MODE has been set to true, baseline is being regenerated.\n' +
          'Please double-check the file for any unexpected changes'
      fs.writeFileSync(baselinePath, fs.readFileSync(resultPath))
      pass = true
    } else {
      if (pass) {
        this.message = 'Screenshots Matched for ' + filename +
            ' with a tolerance of ' + this.expected + '%.'
      } else {
        this.message = 'Screenshots Match Failed for ' + filename +
            ' with a tolerance of ' + this.expected + '%.\n' +
            '   Screenshots at:\n' +
            '    Baseline: ' + baselinePath + '\n' +
            '    Result: ' + resultPath + '\n' +
            '    Diff: ' + diffPath + '\n' +
            '   Open ' + diffPath + ' to see how the screenshot has changed.\n' +
            '   If the Result Screenshot is correct you can use it to update the Baseline Screenshot and re-run your test:\n' +
            '    cp ' + resultPath + ' ' + baselinePath
      }
    }
    return pass
  }
}
