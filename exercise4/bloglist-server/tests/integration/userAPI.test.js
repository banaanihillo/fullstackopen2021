const ava = require("ava")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const User = require("../../models/User")
const testHelper = require("../../utilities/test_helper")
const supertest = require("supertest")
const app = require("../../app")
const mockAPI = supertest(app)

ava.beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash(
    "fairlyLengthyPassphrase",
    10
  )
  const user = new User({
    userName: "jaerjestelmainValvin",
    passwordHash
  })
  await user.save()
})

ava.after.always(() => {
  mongoose.connection.close().then(() => {
    console.log("Database connection closed")
  })
})

ava.serial("Creation of new users works", async (test) => {
  const users = await testHelper.getUsers()
  const newUser = {
    userName: "Banana Hillo",
    password: "generatedByPasswordManager"
  }

  await mockAPI
    .post("/api/users")
    .send(newUser)
    .expect(201)
  const updatedUsers = await testHelper.getUsers()

  test.is(users.length + 1, updatedUsers.length)
  const userNames = updatedUsers.map((user) => user.userName)
  test.true(userNames.includes("Banana Hillo"))
})

ava.serial("Creation of duplicate users throws", async (test) => {
  const users = await testHelper.getUsers()
  const newUser = {
    userName: "jaerjestelmainValvin",
    password: "insecurePassword"
  }

  const response = await mockAPI
    .post("/api/users")
    .send(newUser)
    .expect(400)
  test.true(response.body.error.includes("unique"))
  const refetchedUsers = await testHelper.getUsers()
  test.is(users.length, refetchedUsers.length)
})
