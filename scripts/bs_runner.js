const Nightwatch = require('nightwatch')
const browserstack = require('browserstack-local')
let bsLocal
try {
  process.mainModule.filename = './node_modules/.bin/nightwatch'
  // Code to start browserstack local before start of test
  console.log('Connecting local')
  Nightwatch.bsLocal = bsLocal = new browserstack.Local()
  if (bsLocal.isRunning()) {
    bsLocal.stop()
  }
  bsLocal.start({ key: process.env.BROWSERSTACK_ACCESS_KEY || process.env.BROWSERSTACK_PSW, force: 'true' }, function (error) {
    if (error) throw error

    console.log('Connected. Now testing...')
    Nightwatch.cli(function (argv) {
      Nightwatch.CliRunner(argv)
        .setup(null, function () {
          // Code to stop browserstack local after end of parallel test
          bsLocal.stop(function () {})
        })
        .runTests(function () {
          // Code to stop browserstack local after end of single test
          bsLocal.stop(function () {})
        })
    })
  })
} catch (ex) {
  console.log('There was an error while starting the test runner:\n\n')
  process.stderr.write(ex.stack + '\n')
  if (bsLocal) {
    bsLocal.stop()
  }
  process.exit(2)
}
