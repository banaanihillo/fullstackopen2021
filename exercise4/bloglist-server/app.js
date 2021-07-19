const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("express-async-errors")
const {
  tokenExtractor,
  notFound,
  errorHandler
} = require("./customMiddleWare")
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

app.use(tokenExtractor)
app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)

if (process.env.NODE_ENV === "test") {
  const testRouter = require("./routes/testRouter")
  app.use("/api/test", testRouter)
}

app.use(notFound) //
app.use(errorHandler) //

module.exports = app
