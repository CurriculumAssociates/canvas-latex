const merge = require('deepmerge')

const commonTestSettings = {
  launch_url: 'http://localhost:8888',
  silent: true,
  desiredCapabilities: {
    project: 'CanvasLatex',
    build: process.env.BUILD_NAME || 'CanvasLatex - ' + process.env.USER,
    'browserstack.user': process.env.BROWSERSTACK_USERNAME || process.env.BROWSERSTACK_USR,
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || process.env.BROWSERSTACK_PSW,
    resolution: '1920x1080',
    'browserstack.debug': true,
    'browserstack.local': true,
    acceptSslCerts: true
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
    start_process: false,
    host: 'hub-cloud.browserstack.com',
    port: 443
  },

  test_settings: {
    chrome: {
      desiredCapabilities: {
        "os": "OS X",
        "os_version": "Monterey",
        "browser": "chrome",
        "browserName": "chrome",
        "device": null,
        "browser_version": "98.0",
        "real_mobile": null
      }
    },
    firefox: {
      desiredCapabilities: {
        "os": "OS X",
        "os_version": "Monterey",
        "browser": "firefox",
        "browserName": "firefox",
        "device": null,
        "browser_version": "97.0",
        "real_mobile": null
      }
    },
    edge: {
      desiredCapabilities: {
        "os": "Windows",
        "os_version": "11",
        "browser": "edge",
        "browserName": "edge",
        "device": null,
        "browser_version": "97.0",
        "real_mobile": null
      }
    },
    safari: {
      desiredCapabilities: {
        "os": "OS X",
        "os_version": "Big Sur",
        "browser": "safari",
        "browserName": "safari",
        "device": null,
        "browser_version": "14.1",
        "real_mobile": null
      }
    }
  }
}

// Code to copy seleniumhost/port into test settings
for (const i in nightwatchConfig.test_settings) {
  const config = nightwatchConfig.test_settings[i]
  config.selenium_host = nightwatchConfig.selenium.host
  config.selenium_port = nightwatchConfig.selenium.port
  nightwatchConfig.test_settings[i] = merge(config, commonTestSettings)
}

module.exports = nightwatchConfig
