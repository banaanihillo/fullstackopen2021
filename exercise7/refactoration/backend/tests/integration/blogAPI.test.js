// The two collections are kinda tightly coupled,
// so test them both in the same test file,
// to disallow concurrent access to the same database,
// and execute every test serially

const ava = require("ava")
const supertest = require("supertest")
const mongoose = require("mongoose")
const Blog = require("../../models/Blog")
const User = require("../../models/User")
const testHelper = require("../../utilities/test_helper")
const app = require("../../app")
const mockAPI = supertest(app)

const dummyBlogs = [
  {
    title: "Uhh Ohh",
    author: "Li'l Jon",
    url: "/",
    upvotes: -1
  },
  {
    title: "Adrasteia",
    author: "Mechina",
    url: "https://mechinamusic.bandcamp.com/",
    upvotes: 6
  }
]
const dummyUsers = [
  {
    userName: "Banaani Hillo",
    password: "sufficientlyLengthyPassphrase"
  },
  {
    userName: "Not Banaani Hillo",
    password: "sufficientlyLengthyPassphrase"
  }
]
// Will include "Bearer [token]" once the before hook has run
let authorization = null

ava.beforeEach(async () => {
  await Blog.deleteMany()
  await User.deleteMany()
  // Add two dummy users
  await mockAPI
    .post("/api/users")
    .send(dummyUsers[0])
  await mockAPI
    .post("/api/users")
    .send(dummyUsers[1])
  
  // Log in the user number one
  const response = await mockAPI
    .post("/api/login")
    .send(dummyUsers[0])
  authorization = `Bearer ${response.body.token}`

  // Add two dummy blogs, with user one as their creator
  await mockAPI
    .post("/api/blogs")
    .set("Authorization", authorization)
    .send(dummyBlogs[0])
  await mockAPI
    .post("/api/blogs")
    .set("Authorization", authorization)
    .send(dummyBlogs[1])
})

ava.after.always(() => {
  mongoose.connection.close().then(() => {
    console.log("Database connection closed")
  })
})

ava.serial("Dummy blogs are added to Mongo", async (test) => {
  const response = await mockAPI.get("/api/blogs")

  test.is(response.body.length, dummyBlogs.length)
  test.is(response.statusCode, 200)
  test.is(response.type, "application/json")

  const authors = response.body.map((blog) => blog.author)
  test.true(authors.includes("Mechina"))
})

ava.serial("Adding new blogs works", async (test) => {
  const newBlog = {
    title: "Abdul Rahman al Ghafiqi",
    author: "Almach",
    url: "https://almach.bandcamp.com/",
    upvotes: 4
  }
  await mockAPI
    .post("/api/blogs")
    .set("Authorization", authorization)
    .send(newBlog)
  const blogs = await testHelper.getBlogs()
  test.is(blogs.length, dummyBlogs.length + 1)
  const authors = blogs.map((blog) => blog.author)
  test.true(authors.includes("Almach"))
  const titles = blogs.map((blog) => blog.title)
  test.true(titles.includes("Abdul Rahman al Ghafiqi"))
})

ava.serial("Missing title throws", async (test) => {
  const titleMissing = {
    author: "Titans Fall Harder",
    url: "https://titansfallharder.bandcamp.com/",
    upvotes: 7
  }
  await mockAPI
    .post("/api/blogs")
    .set("Authorization", authorization)
    .send(titleMissing)
    .expect(400)
  const blogs = await testHelper.getBlogs()
  test.is(blogs.length, dummyBlogs.length)
})

ava.serial("Missing author throws", async (test) => {
  const authorMissing = {
    title: "Yamra",
    url: "http://almach.bandcamp.com/",
    upvotes: 2
  }
  await mockAPI
    .post("/api/blogs")
    .set("Authorization", authorization)
    .send(authorMissing)
    .expect(400)
  const blogs = await testHelper.getBlogs()
  test.is(blogs.length, dummyBlogs.length)
})

ava.serial("getBlogs", async (test) => {
  const blogs = await testHelper.getBlogs()
  test.is(blogs.length, dummyBlogs.length)
})

ava.serial("Get by ID works", async (test) => {
  const blogs = await testHelper.getBlogs()
  const firstBlog = {
    ...blogs[0],
    user: blogs[0].user.toString()
  }

  const {body: blogByID} = await mockAPI
    .get(`/api/blogs/${firstBlog.id}`)
    .expect(200)
  test.deepEqual(blogByID, firstBlog)
})

ava.serial("Deletion works", async (test) => {
  const blogs = await testHelper.getBlogs()
  const firstBlog = blogs[0]

  await mockAPI
    .delete(`/api/blogs/${firstBlog.id}`)
    .set("Authorization", authorization)
    .expect(204)
  const oneLessBlog = await testHelper.getBlogs()

  test.is(blogs.length - 1, oneLessBlog.length)
  const authors = oneLessBlog.map((blog) => blog.author)
  test.false(authors.includes("Li'l Jon"))
  test.true(!authors.includes("Li'l Jon"))
})

ava.serial("_id is renamed into id", async (test) => {
  const blogs = await testHelper.getBlogs()
  const secondBlog = blogs[1]
  test.truthy(secondBlog.id)
  test.falsy(secondBlog._id)
})

ava.serial("Blogs with no upvotes can be added", async (test) => {
  const newBlog = {
    author: "Humphrey's Clock",
    title: "Euphoria of Poetry",
    url: "https://humphreysclock.bandcamp.com/"
  }

  const {body: addedBlog} = await mockAPI
    .post("/api/blogs")
    .set("Authorization", authorization)
    .send(newBlog)
    .expect(201)
  test.is(addedBlog.upvotes, 0)
  test.not(addedBlog.upvotes, undefined)
})

ava.serial("Blogs with no address can not be added", async (test) => {
  const addressMissing = {
    author: "The Elysian Fields",
    title: "Grandiosity",
    upvotes: 2
  }
  await mockAPI
    .post("/api/blogs")
    .set("Authorization", authorization)
    .send(addressMissing)
    .expect(400)
  const blogs = await testHelper.getBlogs()
  const authors = blogs.map((blog) => blog.author)
  test.true(!authors.includes("The Elysian Fields"))
})

ava.serial("Blog upvotes can be incremented", async (test) => {
  const blogs = await testHelper.getBlogs()
  const secondBlog = blogs[1]
  const blogToIncrement = {
    ...secondBlog,
    upvotes: secondBlog.upvotes + 1
  }

  const {body: updatedBlog} = await mockAPI
    .patch(`/api/blogs/${secondBlog.id}`)
    .send(blogToIncrement)
    .expect(201)
  test.is(updatedBlog.upvotes, secondBlog.upvotes + 1)
})

ava.serial("Creation of new users works", async (test) => {
  const users = await testHelper.getUsers()
  const newUser = {
    userName: "Banana Hillo",
    password: "generatedByPasswordManager"
  }

  await mockAPI
    .post("/api/users")
    .set("Authorization", authorization)
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
    userName: "Banaani Hillo",
    password: "Probably not the same password, iunno"
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

ava.serial("Unauthorized blog addition throws", async (test) => {
  const blogs = await testHelper.getBlogs()
  const unauthorizedBlog = {
    title: "Infineon",
    author: "Mechina",
    url: "https://mechinamusic.bandcamp.com"
  }

  const response = await mockAPI
    .post("/api/blogs")
    .send(unauthorizedBlog)
    .expect(401)
  const refetchedBlogs = await testHelper.getBlogs()
  test.true(response.body.error.includes("Invalid token"))
  test.is(blogs.length, refetchedBlogs.length)
})

ava.serial("Unauthorized blog deletion throws", async (test) => {
  const blogs = await testHelper.getBlogs()
  const response = await mockAPI
    .delete(`/api/blogs/${blogs[0].id}`)
    .expect(401)
  test.true(response.body.error.includes("Invalid token"))
  const refetchedBlogs = await testHelper.getBlogs()
  test.is(blogs.length, refetchedBlogs.length)
})

ava.serial("Malicious blog deletion throws", async (test) => {
  const blogs = await testHelper.getBlogs()
  // Log in the user who is not Banaani Hillo
  const response = await mockAPI
    .post("/api/login")
    .send(dummyUsers[1])
  authorization = `Bearer ${response.body.token}`

  const maliciousDeletion = await mockAPI
    .delete(`/api/blogs/${blogs[0].id}`)
    .set("Authorization", authorization)
    .expect(401)
  test.true(maliciousDeletion.body.error.includes(
    "Blogs can only be removed by the creator"
  ))

  const refetchedBlogs = await testHelper.getBlogs()
  test.is(blogs.length, refetchedBlogs.length)
})
