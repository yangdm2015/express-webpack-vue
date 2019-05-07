'use strict'
const utils = require('./utils')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = true
let op = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  // cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
// console.log('op = ', op)
// console.log('op.loaders.sass = ', op.loaders.sass)
module.exports = op

