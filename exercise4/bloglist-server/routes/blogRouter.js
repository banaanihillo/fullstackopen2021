const blogRouter = require("express").Router()
const Blog = require("../models/Blog")

blogRouter.get("/", async (_request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body)
  const newBlog = await blog.save()
  response.status(201).json(newBlog)
})

module.exports = blogRouter
