const path = require('path')

module.exports = {
    dev: {
        assetsSubDirectory: 'static',
    },
    build: {
        assetsSubDirectory: 'element-vue/static',
        // Template for index.html
        index: path.resolve(__dirname, '../docs/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../public'),
    }
}