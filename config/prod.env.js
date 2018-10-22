'use strict'
console.log(process.env.huanjing)
module.exports = {
  NODE_ENV: '"production"',
  huanjing:`"${process.env.huanjing}"`
}
