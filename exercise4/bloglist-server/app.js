const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("express-async-errors")
const blogRouter = require("./routes/blogRouter")
const userRouter = require("./routes/userRouter")
const loginRouter = require("./routes/loginRouter")

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
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)

const notFound = (request, response) => {
  response.status(404).send({
    error: `No such address found: ${request.url}`
  })
}
app.use(notFound)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  switch (error.name) {
    case "CastError":
      return response.status(400).send({
        error: `Malformed ID ${request.params.id}. ${error}`
      })
    case "ValidationError":
      return response.status(400).send({
        error: error.message
      })
    case "JsonWebTokenError":
      return response.status(401).send({
        error: `Invalid token. ${error.message}`
      })
    case "TokenExpiredError":
      return response.status(401).send({
        error: `Token expired. ${error.message}`
      })
  }
  
  next(error)
}
app.use(errorHandler)


module.exports = app
