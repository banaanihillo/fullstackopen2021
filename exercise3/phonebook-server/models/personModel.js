const mongoose = require("mongoose")

let personSchema = new mongoose.Schema({
  name: String,
  number: String
})
personSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Person", personSchema)
