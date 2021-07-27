const bcrypt = require("bcrypt")
const userRouter = require("express").Router()
const User = require("../models/User")

userRouter.post("/", async (request, response) => {
  if (!request.body.password) {
    const errorMessage = "Password input is required."
    console.error(errorMessage)
    return response.status(400).json({
      error: errorMessage
    })
  }
  if (request.body.password.length < 15) {
    const errorMessage =
      "Password too short. Consider using a password manager."
    console.error(errorMessage)
    return response.status(400).json({
      error: errorMessage
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(
    request.body.password,
    saltRounds
  )

  const user = new User({
    userName: request.body.userName,
    givenName: request.body.givenName,
    passwordHash
  })

  const newUser = await user.save()
  response.status(201).json(newUser)
})

userRouter.get("/", async (_request, response) => {
  const users = await User
    .find({})
    .populate(
      "blogs",
      {
        title: 1,
        author: 1,
        url: 1,
        upvotes: 1
      }
    )
  response.json(users)
})

userRouter.get("/:id", async (request, response) => {
  const user = await User
    .findById(request.params.id)
    .populate(
      "blogs",
      {
        title: 1,
        author: 1,
        url: 1,
        upvotes: 1
      }
    )
  response.json(user)
})

module.exports = userRouter
