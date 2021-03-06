const mongoose = require("mongoose")
require("dotenv").config()

module.exports = () => {
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
    throw new Error(`Could not connect to Mongo. ${error}`)
  })
}
