const fs = require('fs')
const path = require('path')
const prettyHtml = require('json-pretty-html').default;
const json2htmlParser = require('../json2html/parser')
const crawler = require('../crawler/crawler')
const logger = require('../utils/logger')
const analytics = require('../utils/analytics')

const ENCODING_UTF8 = 'utf8'
const REPLACE_PATTERN = '@insert@'
const ERROR_404_HTML_TEMPLATE = 'server/templates/404.template'
const htmlTemplates = {
  basic: 'server/templates/basic.template',
  json: 'server/templates/json.template'
}

const generate = async (email, password, urlProfile, theme = Object.keys(htmlTemplates)[0]) => {
  let content = ''
  let parsedProfileInfo = `<h1>404</h1> <p>Profile '${urlProfile}' not found.</p>`
  try {
    const begin = (new Date()).getTime()
    const profile = await crawler.craw(email, password, urlProfile)
    const end = (new Date()).getTime()

    analytics.register(email, urlProfile, true, end-begin)

    if (htmlTemplates[theme] === htmlTemplates.json) {
      const json = Object.assign({}, { 
        profile: profile.profile, 
        positions: profile.positions, 
        educations: profile.educations 
      })
      parsedProfileInfo = prettyHtml(json, json.profile);
    } else {
      parsedProfileInfo = json2htmlParser.parse(profile);
    }

    content = fs.readFileSync(path.join(process.cwd(), htmlTemplates[theme]), ENCODING_UTF8)
  } catch(err) {
    logger.error(err)
    content = fs.readFileSync(path.join(process.cwd(), ERROR_404_HTML_TEMPLATE), ENCODING_UTF8)

    analytics.register(email, urlProfile, false, 0)
  }
  
  return content.replace(REPLACE_PATTERN, parsedProfileInfo)
}

module.exports = { generate }