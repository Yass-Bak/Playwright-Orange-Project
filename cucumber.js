module.exports = {
    default: {
        // Feature files location
        paths: ['tests/features/**/*.feature'],

        // Step definitions and support files
        require: ['tests/features/support/**/*.ts'],

        // Require modules for TypeScript support
        requireModule: ['ts-node/register'],

        // Format options
        format: [
            'progress-bar',                                      // Console progress
            'json:allure-results/cucumber.json',                 // JSON for Allure
            'html:cucumber-report/cucumber-report.html'          // HTML report
        ],

        // Formatting options
        formatOptions: {
            snippetInterface: 'async-await'
        },

        // Parallel execution
        parallel: 2,

        // Publish results
        publish: false,

        // Retry failed scenarios
        retry: 1,

        // Strict mode - fail if there are undefined or pending steps
        strict: true
    }
};

// Set ts-node options via environment
process.env.TS_NODE_PROJECT = './tsconfig.cucumber.json';
