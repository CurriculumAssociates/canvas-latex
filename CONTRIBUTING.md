# Contributing to canvas-latex project

A big welcome and thank you for considering contributing to createjs-accessibility open source projects! It’s people like you that make it a reality for users in our community. Some examples of contributions can include, but are not limited to:
1. A new canvas based renderer
2. A new LaTeX feature
3. Adding tests
4. Improving documentation

Reading and following these guidelines will help us make the contribution process easy and effective for everyone involved. It also communicates that you agree to respect the time of the developers managing and developing these open source projects. In return, we will reciprocate that respect by addressing your issue, assessing changes, and helping you finalize your pull requests.

## Quicklinks

* [Code of Conduct](#code-of-conduct)
* [Getting Started](#getting-started)
    * [Issues](#issues)
    * [Pull Requests](#pull-requests)
* [Getting Help](#getting-help)

## Code of Conduct

We take our open source community seriously and hold ourselves and other contributors to high standards of communication. By participating and contributing to this project, you agree to uphold our [Code of Conduct](https://github.com/CurriculumAssociates/canvas-latex/blob/main/CODE_OF_CONDUCT.md).

## Getting Started

Contributions are made to this repo via Issues and Pull Requests (PRs). A few general guidelines that cover both:

- Search for existing Issues and PRs before creating your own.
- We work hard to makes sure issues are handled in a timely manner but, depending on the impact, it could take a while to investigate the root cause. A friendly ping in the comment thread to the submitter or a contributor can help draw attention if your issue is blocking.

### Issues

[Issues](https://github.com/CurriculumAssociates/canvas-latex/issues) should be used to report problems with the library, request a new feature, or to discuss potential changes before a PR is created. When you create a new Issue, a template will be loaded that will guide you through collecting and providing the information we need to investigate.
If you find an Issue that addresses the problem you're having, please add your own reproduction information to the existing issue rather than creating a new one. Adding a [reaction](https://github.blog/2016-03-10-add-reactions-to-pull-requests-issues-and-comments/) can also help indicate to our maintainers that a particular problem is affecting more than just the reporter.

### Pull Requests

PRs to our repo are always welcome and can be a quick way to get your fix or improvement slated for the next release. In general, PRs should:

- Only fix/add the functionality in question **OR** address wide-spread whitespace/style issues, not both.
- Add unit or integration tests for fixed or changed functionality (if a test suite already exists).
- Address a single concern in the least number of changed lines as possible.
- Make sure your code is well documented.
- Include documentation in the repo by updating our [usage section](https://github.com/CurriculumAssociates/canvas-latex/blob/master/README.md#try-it-yourself).
- Be accompanied by a complete Pull Request template (loaded automatically when a PR is created).

For changes that address core functionality or would require breaking changes (e.g. a major release), it's best to open an Issue to discuss your proposal first. This is not required but can save time creating and reviewing changes.

In general, we follow the ["fork-and-pull" Git workflow](https://github.com/susam/gitpr)

1. Fork the repository to your own Github account
2. Clone the project to your machine
3. Create a branch locally with a succinct but descriptive name
4. Commit changes to the branch
5. Following any formatting and testing guidelines specific to this repo
6. Push changes to your fork
7. Open a PR in our repository and follow the PR template so that we can efficiently review the changes.

### Tests

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

## Getting Help

For assistance, please send an email to opensource@cainc.com.

