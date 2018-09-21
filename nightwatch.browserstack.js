const merge = require('deepmerge')

const commonTestSettings = {
  launch_url: 'http://localhost:8888',
  silent: true,
  desiredCapabilities: {
    'project': 'CanvasLatex',
    'build': process.env.BUILD_NAME || 'CanvasLatex - ' + process.env.USER,
    'browserstack.user': process.env.BROWSERSTACK_USERNAME || process.env.BROWSERSTACK_USR,
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || process.env.BROWSERSTACK_PSW,
    'resolution': '1920x1080',
    'browserstack.debug': true,
    'browserstack.local': true,
    'acceptSslCerts': true
  },
  globals: {
    environment: 'browserstack',
    updateMode: process.env.UPDATE_MODE
  }
}

const nightwatchConfig = {
  src_folders: ['test/selenium/tests'],
  custom_commands_path: 'test/selenium/commands',
  custom_assertions_path: 'test/selenium/assertions',
  output_folder: 'reports',
  selenium: {
    'start_process': false,
    'host': 'hub-cloud.browserstack.com',
    'port': 80
  },

  test_settings: {
    chrome: {
      'desiredCapabilities': {
        'browser': 'Chrome',
        'browserName': 'chrome',
        'browser_version': '63',
        'os': 'OS X',
        'os_version': 'Sierra'
      }
    },
    firefox: {
      'desiredCapabilities': {
        'browser': 'Firefox',
        'browserName': 'firefox',
        'browser_version': '58.0 beta',
        'os': 'OS X',
        'os_version': 'Sierra'
      }
    },
    edge: {
      desiredCapabilities: {
        'browser': 'MicrosoftEdge',
        'browserName': 'edge',
        'browser_version': '16.0',
        'os': 'Windows',
        'os_version': '10'
      }
    },
    safari: {
      desiredCapabilities: {
        'browser': 'Safari',
        'browserName': 'safari',
        'browser_version': '10.0',
        'os': 'OS X',
        'os_version': 'Sierra'
      }
    }
  }
}

// Code to copy seleniumhost/port into test settings
for (var i in nightwatchConfig.test_settings) {
  var config = nightwatchConfig.test_settings[i]
  config['selenium_host'] = nightwatchConfig.selenium.host
  config['selenium_port'] = nightwatchConfig.selenium.port
  nightwatchConfig.test_settings[i] = merge(config, commonTestSettings)
}

module.exports = nightwatchConfig
