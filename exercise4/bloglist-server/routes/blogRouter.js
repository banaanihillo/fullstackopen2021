const blogRouter = require("express").Router()
const Blog = require("../models/Blog")
const User = require("../models/User")
const jsonWebToken = require("jsonwebtoken")

const getToken = (request) => {
  const authorization = request.get("authorization")
  if (
    authorization
    && authorization.toLowerCase().startsWith("bearer ")
  ) {
    return authorization.slice(7)
  }
}

blogRouter.get("/", async (_request, response) => {
  const blogs = await Blog
    .find({})
    .populate(
      "user",
      {
        userName: 1
      }
    )
  response.json(blogs)
})

blogRouter.post("/", async (request, response) => {
  const token = getToken(request)
  const decodedToken = jsonWebToken.verify(
    token,
    process.env.SECRET
  )
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: "Invalid token."
    })
  }

  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(404).json({
      error: "No user found?"
    })
  }

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    upvotes: request.body.upvotes || 0,
    user: user.id
  })
  const newBlog = await blog.save()

  user.blogs = [
    ...user.blogs,
    newBlog.id
  ]
  await user.save()

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
