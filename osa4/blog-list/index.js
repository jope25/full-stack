const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

module.exports = Blog

app.use(bodyParser.json())

require('dotenv').config()
const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
