const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  upvotes: Number
})

module.exports = mongoose.model("Blog", blogSchema)
