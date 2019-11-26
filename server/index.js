const express = require('express')
const bodyParser = require('body-parser')
const generator = require('./generator/generator')
const logger = require('./utils/logger')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/crawl-form', async function(req, res) {
  const content = await generator.generate(
    req.body.username.trim(), 
    req.body.password.trim(),
    req.body.profile.trim(),
    req.body.theme
  )
  res.send(content)
})

app.listen(port = process.env.PORT || 8080, function () {
  logger.info(`Server running on port ${port}`)
})
