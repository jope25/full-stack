const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

app.use(bodyParser.json())

require('dotenv').config()

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to database', process.env.MONGODB_URI)
  })
  .catch(err => {
    console.log(err)
  })

app.use('/api/blogs', blogsRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
