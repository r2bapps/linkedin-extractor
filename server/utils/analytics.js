const md5 = require('md5')
const fs = require('fs')
const path = require('path')

// File must exist and nice to have column headers
const SOURCE_FILE = 'public/analytics/registers.csv'

const register = (email, profileId, success, time) => {
  // ANY PERSONAL INPUT MUST BE OBFUSCATED WITH MD5
  const line = `${new Date().toISOString()},${md5(email)},${md5(profileId)},${success},${time}\n`
  fs.appendFileSync(path.join(process.cwd(), SOURCE_FILE), line);
}

module.exports = { register }