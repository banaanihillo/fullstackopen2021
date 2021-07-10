const blogRouter = require("express").Router()
const Blog = require("../models/Blog")
const User = require("../models/User")
const jsonWebToken = require("jsonwebtoken")

const decodeToken = (token) => {
  return jsonWebToken.verify(
    token,
    process.env.SECRET
  )
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
  const decodedToken = decodeToken(request.token)
  if (!request.token || !decodedToken.id) {
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
  const decodedToken = decodeToken(request.token)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({
      error: "Invalid token."
    })
  }

  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== decodedToken.id.toString()) {
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

module.exports = blogRouter
