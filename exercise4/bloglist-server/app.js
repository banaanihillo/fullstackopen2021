const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const blogRouter = require("./routes/blogRouter")
require("express-async-errors")

require("dotenv").config()
const databaseAddress = (
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
)
mongoose.connect(
  databaseAddress,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
).then(() => {
  console.log("Connection to Mongo successful.")
}).catch((error) => {
  console.error(`Could not connect to Mongo. ${error}`)
})

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogRouter)

/*
const notFound = (request, response) => {
  response.status(404).send({
    error: `No such address found: ${request.url}`
  })
}
app.use(notFound)
// never gets here?
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === "CastError") {
    return response.status(400).send({
      error: `Malformed ID ${request.params.id}. ${error}`
    })
  } else if (error.name === "ValidationError") {
    return response.status(400).send({
      error: error.message
    })
  }
  next(error)
}
app.use(errorHandler)
*/

module.exports = app
