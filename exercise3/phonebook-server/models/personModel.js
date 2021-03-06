const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  number: {
    type: String,
    required: true,
    minLength: 8
  }
})
personSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
personSchema.plugin(
  uniqueValidator,
  {
    message: "{VALUE} already exists. The {PATH} should be unique."
  }
)

module.exports = mongoose.model("Person", personSchema)
