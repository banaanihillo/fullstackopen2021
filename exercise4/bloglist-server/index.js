const http = require("http")
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const blogRouter = require("./routes/blogRouter")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(
  process.env.MONGODB_URI,
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

app.use("/api/blogs", blogRouter)

const PORT = process.env.PORT || 3001
const server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`)
})
