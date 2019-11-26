const scrapedin = require('scrapedin')
const configFile = require('../../config.json')

const craw = async (email, password, urlProfile) => {
  const config = Object.assign({}, configFile, { email, password })
  return ( await scrapedin(config) )(urlProfile)
}

module.exports = { craw }
