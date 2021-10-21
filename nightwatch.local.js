module.exports = {
  src_folders: ['test/selenium/tests'],
  output_folder: 'reports',
  custom_commands_path: 'test/selenium/commands',
  custom_assertions_path: 'test/selenium/assertions',
  page_objects_path: '',
  globals_path: '',

  selenium: {
    start_process: false,
    server_path: '',
    log_path: '',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': '',
      'webdriver.gecko.driver': ''
    }
  },

  test_settings: {
    default: {
      launch_url: 'http://0.0.0.0:8080',
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      screenshots: {
        enabled: false,
        path: ''
      },
      desiredCapabilities: {
        browserName: 'chrome',
        resolution: '1920x1080'
      }
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        resolution: '1920x1080'
      },
      globals: {
        environment: 'local',
        updateMode: process.env.UPDATE_MODE
      }
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        resolution: '1920x1080'
      },
      globals: {
        environment: 'local',
        updateMode: process.env.UPDATE_MODE
      }
    }
  }
}
