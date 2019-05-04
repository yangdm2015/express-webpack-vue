const path = require('path')

module.exports = {
    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../docs/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../public'),
    }
}