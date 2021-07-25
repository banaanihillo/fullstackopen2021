const jsonWebToken = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../models/User")

loginRouter.post("/", async (request, response) => {
  const user = await User.findOne({
    userName: request.body.userName
  })

  const correctPassword = (
    !user
      ? false
      : await bcrypt.compare(
        request.body.password,
        user.passwordHash
      )
  )

  if (!user || !correctPassword) {
    return response.status(401).json({
      error: "User name and/or password incorrect"
    })
  }

  const tokenUser = {
    userName: user.userName,
    id: user.id
  }
  const token = jsonWebToken.sign(
    tokenUser,
    process.env.SECRET/*,
    {
      expiresIn: time in seconds
    }*/
  )

  response.status(200).send({
    token,
    userName: user.userName,
    givenName: user.givenName || "[unassigned]",
    id: user.id
  })

})

module.exports = loginRouter
