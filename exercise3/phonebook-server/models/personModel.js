const mongoose = require("mongoose")

let personSchema = new mongoose.Schema({
  name: String,
  number: String
})
personSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString()
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Person", personSchema)
