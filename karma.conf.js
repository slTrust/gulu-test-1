var webpackConfig = require('@vue/cli-service/webpack.config.js')
console.log('------------');
module.exports = function (config) {
    config.set({
        frameworks: ['mocha'],

        files: [
            'tests/**/*.spec.js'
        ],

        preprocessors: {
            '**/*.spec.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,

        reporters: ['spec','coverage'],
        coverageReporter: {
            dir: './coverage',
            reporters: [
                    { type: 'lcov', subdir: '.' },
                    { type: 'text-summary' }
                ]
        },
        autoWatch: true,

        browsers: ['ChromeHeadless']
    })
}