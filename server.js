// server.js
const express = require('express')
require('dotenv').config()


const HTTP_SERVER_PORT = process.env.HTTP_PORT || 8080
const app = express()
// redirect everything under /api to your target
app.use('*', (req, res) => {
  const targetUrl = req.originalUrl
  res.redirect(307, targetUrl)
})

app.listen(HTTP_SERVER_PORT, () => {
  console.log(`Proxy running at http://localhost:${HTTP_SERVER_PORT}`)
})