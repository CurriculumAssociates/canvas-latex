const selenium = require('selenium-standalone')
const nightwatch = require('nightwatch')

selenium.start((err, child) => {
  if (err) throw new Error(err)
  const done = function () { child.kill() }
  nightwatch.cli((argv) => {
    nightwatch.runner(argv, done, {})
  })
})
