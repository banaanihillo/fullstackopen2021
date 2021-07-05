const mongoose = require("mongoose")
require("dotenv").config()

module.exports = connectToDatabase = () => {
  mongoose.connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  )
  .then(() => {
    console.log("Connection to Mongo successful.")
  })
  .catch((error) => {
    throw new Error(`Could not connect to Mongo. ${error}`)
  })
}
