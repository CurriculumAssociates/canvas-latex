var Nightwatch = require('nightwatch')
var browserstack = require('browserstack-local')
var bsLocal
var httpServer = require('http-server');
var server
var bsPID
try {
  server = httpServer.createServer({
    root: `${__dirname}/../dist/`,
    robots: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    }
  });

  server.listen(8888);
  
  process.mainModule.filename = './node_modules/.bin/nightwatch'

  // Code to start browserstack local before start of test
  console.log('Connecting local')
  // console.log(process.env.BROWSERSTACK_ACCESS_KEY);
  Nightwatch.bsLocal = bsLocal = new browserstack.Local()
  bsPID = bsLocal.pid;
  bsLocal.start({ 'key': process.env.BROWSERSTACK_ACCESS_KEY || process.env.BROWSERSTACK_PSW, 'force': 'true' }, function (error) {
    if (error) throw error
    console.log('browserstack pid:', bsLocal.pid);
    console.log('Connected. Now testing...')
    Nightwatch.cli(function (argv) {
      Nightwatch.CliRunner(argv)
        .setup(null, () => {
          // Code to stop browserstack local after end of parallel test
          bsLocal.stop(() => {
            if (server) server.close();
            process.exit(0);
          });
        })
        .runTests(function () {
          // Code to stop browserstack local after end of single test
        })
    })
  })
} catch (ex) {
  console.log('There was an error while starting the test runner:\n\n')
  process.stderr.write(ex.stack + '\n')
  if (server) server.close();
  if (bsLocal) bsLocal.stop();
  if (bsPID) process.kill(bsPID);
  process.exit(2)
}
