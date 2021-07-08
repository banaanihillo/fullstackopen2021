const blogRouter = require("express").Router()
const Blog = require("../models/Blog")

blogRouter.get("/", async (_request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post("/", async (request, response) => {

  const blogProperties = {
    ...request.body,
    upvotes: request.body.upvotes || 0
  }
  const blog = new Blog(blogProperties)
  const newBlog = await blog.save()
  response.status(201).json(newBlog)
  //
})

blogRouter.get("/:id", async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({
      error: `No blog found with the ID ${request.params.id}.`
    })
  }
  response.json(blog)

})

blogRouter.delete("/:id", async (request, response) => {

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()

})

blogRouter.patch("/:id", async (request, response) => {

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      upvotes: request.body.upvotes
    },
    {
      new: true
    }
  )
  response.status(201).json(updatedBlog)
  
})

module.exports = blogRouter
