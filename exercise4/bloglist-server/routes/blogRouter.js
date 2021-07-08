const blogRouter = require("express").Router()
const Blog = require("../models/Blog")

blogRouter.get("/", async (_request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post("/", async (request, response) => {
  try {
    const blogProperties = {
      ...request.body,
      upvotes: request.body.upvotes || 0
    }
    const blog = new Blog(blogProperties)
    const newBlog = await blog.save()
    response.status(201).json(newBlog)
  } catch (exception) {

    return response.status(400).json({
      error: `Title and author are required. ${exception}`
    })
  }
})

blogRouter.get("/:id", async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).json({
        error: `No blog found with the ID ${request.params.id}.`
      })
    }
    response.json(blog)
  } catch (exception) {
    console.error("Something else went wrong", exception)
    throw new Error(exception)
  }
})

blogRouter.delete("/:id", async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    console.log("Nothing to remove? Have a 204 anyway")
    response.status(204).send({
      error: `${request.params.id} did not exist. ${exception}`
    })
  }
})

module.exports = blogRouter
