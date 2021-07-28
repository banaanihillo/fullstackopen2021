const blogRouter = require("express").Router()
const Blog = require("../models/Blog")
const {userExtractor} = require("../customMiddleWare")

blogRouter.get("/", async (_request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post("/", userExtractor, async (request, response) => {
  if (!request.token || !request.user) { //
    return response.status(401).json({
      error: "Invalid token."
    })
  }

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    upvotes: request.body.upvotes || 0,
    user: request.user.id
  })
  const newBlog = await blog.save()

  request.user.blogs = [
    ...request.user.blogs,
    newBlog.id
  ]
  await request.user.save()
  response.status(201).json(newBlog)
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

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  if (!request.token || !request.user) {
    return response.status(401).json({
      error: "Invalid token."
    })
  }

  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== request.user.id.toString()) {
    return response.status(401).json({
      error: "Blogs can only be removed by the creator."
    })
  }

  await blog.remove()
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

blogRouter.post("/:id/comments", async (request, response) => {
  const commentedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      $push: {
        comments: request.body.comment
      }
    },
    {
      new: true,
      upsert: true
    }
  )
  response.status(201).json(commentedBlog)
})

module.exports = blogRouter
