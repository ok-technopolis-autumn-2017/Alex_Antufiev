module.exports = function (wallaby) {
    return {
        files: [
            'src/scripts/**/*.js',
            '!src/scripts/main1.js',
        ],

        tests: [
            'tests/spec/**/*test.js'
        ],

        env: {
            type: 'node',
            runner: 'node'
        },

        testFramework: 'mocha',


    };
};