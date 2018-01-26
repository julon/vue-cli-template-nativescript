# vue-cli-template-library
![Commitizen](https://img.shields.io/badge/Commitizen-enabled-brightgreen.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![Npm badge](https://img.shields.io/npm/v/vue-cli-template-nativescript.svg)
![Travis badge](https://img.shields.io/travis/julon/vue-cli-template-nativescript.svg)
[![Greenkeeper badge](https://badges.greenkeeper.io/julon/vue-cli-template-nativescript.svg)](https://greenkeeper.io/)

> Template for developing Nativescript-VueJS projects

> Bring all the additional tools to complete the Nativescript Vue workflow. Add linters, es6 support with babel, minified build generation, etc. Compatible with any tns testing tooling.

> Rollup + Babel + TravisCI + SemanticRelease

## Usage

```bash
$ npm install -g vue-cli
$ vue init julon/vue-cli-template-nativescript my-project
$ cd my-project
$ npm install
$ npm run dev

# In another shell, to run on your devices
$ tns run android
# or/and
$ tns run ios
```

## What's included

* `npm run build` : Production-ready build.
  * Export to CommonJS, ES Modules, UMD(dev & minified)
  * CSS is embedded in the JS by default
  * Using Rollup to compute Vue, ES6 js files
  * Pugjs and Stylus supported in vue files
* `npm run dev` : Run a rollup build in watch mode
  * Pre-configured to update our src code inside the app folder
* `npm run lint`
  * Rules based on prettier:recommended, vue:recommended
  * Import errors and warning detection
  * Use `npm run lint:fix` to fix eslint errors
* `npm run cz` : Commitizen support
  * Loaded with Conventional-changelog rules
  * Entrypoint to semantic-release automation
* Semantic-release auto-deployment configuration
  * Auto-generate changelog
  * Auto-commit computed package version in git
  * Auto-release in github
  * Enable this features by using the semantic-release-cli


## Fork It And Make Your Own
You can fork this repo to create your own boilerplate, and use it with vue-cli:
```bash
vue init username/repo my-project
```
