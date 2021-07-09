const bcrypt = require("bcrypt")
const userRouter = require("express").Router()
const User = require("../models/User")

userRouter.post("/", async (request, response) => {
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

module.exports = userRouter
