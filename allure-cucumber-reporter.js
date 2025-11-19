const { AllureRuntime } = require('allure-js-commons');
const { CucumberJSAllureFormatter } = require('allure-cucumberjs');
const path = require('path');

class AllureCucumberReporter extends CucumberJSAllureFormatter {
    constructor(options) {
        const resultsDir = path.resolve(process.cwd(), 'allure-results');
        super(options, new AllureRuntime({ resultsDir }), {});
    }
}

module.exports = AllureCucumberReporter;
