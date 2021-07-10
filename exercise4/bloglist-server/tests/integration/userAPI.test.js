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

ava.serial("Invalid user name throws", async (test) => {
  const users = await testHelper.getUsers()
  const userNameTooShort = {
    userName: "Al",
    password: "automaticallyGeneratedPassword"
  }

  const response = await mockAPI
    .post("/api/users")
    .send(userNameTooShort)
    .expect(400)
  test.true(response.body.error.includes("shorter than"))

  const refetchedUsers = await testHelper.getUsers()
  test.is(users.length, refetchedUsers.length)
})

ava.serial("Missing user name throws", async (test) => {
  const users = await testHelper.getUsers()
  const userNameMissing = {
    password: "automaticallyGeneratedPassword"
  }

  const response = await mockAPI
    .post("/api/users")
    .send(userNameMissing)
    .expect(400)
  test.true(response.body.error.includes("required"))

  const refetchedUsers = await testHelper.getUsers()
  test.is(users.length, refetchedUsers.length)
})

ava.serial("Missing password throws", async (test) => {
  const users = await testHelper.getUsers()
  const passwordMissing = {
    userName: "Banan Hlo"
  }

  const response = await mockAPI
    .post("/api/users")
    .send(passwordMissing)
    .expect(400)
  test.true(response.body.error.includes("required"))
  const refetchedUsers = await testHelper.getUsers()
  test.is(users.length, refetchedUsers.length)
})

ava.serial("Too short password throws", async (test) => {
  const users = await testHelper.getUsers()
  const passwordTooShort = {
    userName: "Hllo Bnan",
    password: "s6D5F0%m_2ErR"
  }

  const response = await mockAPI
    .post("/api/users")
    .send(passwordTooShort)
    .expect(400)
  test.true(response.body.error.includes("too short"))
  const refetchedUsers = await testHelper.getUsers()
  test.is(users.length, refetchedUsers.length)
})
