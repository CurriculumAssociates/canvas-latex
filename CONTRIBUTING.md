## Contributing
Anyone is welcome to contribute to this repo. Some examples of contributions can include, but are not limited to:

1. A new canvas based renderer

2. A new LaTeX feature

3. Adding tests

4. Improving documentation

## Install
`npm install`

## Start
`npm start`

## Tests

#### Selenium
Selenium tests are written in nightwatch. Tests are run currently against Firefox, Chrome, Edge, and Safari.

###### Run it Locally
`npm run selenium:local` <br/>

NOTE: Useful for a quick smoke-test, and seeing it run live. Only runs on Chrome/FF at the moment.

###### Run on Browserstack
Browserstack are triggered against PR's

#### Unit
All unit tests are written in Jest.

Run once: `npm run jest`

Watch tests: `npm run jest:watch`

Update tests: `npm run jest:update`
