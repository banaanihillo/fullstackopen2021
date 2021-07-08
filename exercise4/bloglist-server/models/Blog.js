const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  upvotes: Number
})
blogSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    // _id is an ObjectID Object by default,
    // this thing returns that same thing, but as a String,
    // essentially stripping the _bsontype property,
    // and stringifying the UInt8Array element;
    // also rename the property from _id to id,
    // so it looks less like an internal property, I guess?
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
    // also remove that unrenamed property,
    // since that thing is now in the id property
    delete returnedObject._id
  }
})

module.exports = mongoose.model("Blog", blogSchema)
