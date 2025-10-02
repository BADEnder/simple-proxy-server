// server.js
const express = require('express')
const http = require('http')
const path = require('path')
// require('dotenv').config()


const HTTP_SERVER_PORT = process.env.HTTP_PORT || 8080
const app = express()

// redirect everything under /api to your target


// app.use('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'))
// })


 app.use('/', (req, res) => {
    const targetUrl = req.originalUrl
     res.redirect(307, targetUrl)
 })



 http.createServer(app).listen(HTTP_SERVER_PORT, () => {
    console.log(`Proxy running at http://localhost:${HTTP_SERVER_PORT}`)
 })