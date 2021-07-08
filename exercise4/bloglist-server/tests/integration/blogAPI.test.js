const ava = require("ava")
const supertest = require("supertest")
const mongoose = require("mongoose")
const Blog = require("../../models/Blog")
const blogHelper = require("../../utilities/blog_helper")
const app = require("../../app")
const mockAPI = supertest(app)

const dummyBlogs = [
  {
    title: "Uhh Ohh",
    author: "Li'l Jon",
    upvotes: -1
  },
  {
    title: "Adrasteia",
    author: "Mechina",
    upvotes: 6
  }
]

ava.beforeEach(async () => {
  await Blog.deleteMany()
  await Blog.insertMany(dummyBlogs)
})

ava.after.always(() => {
  mongoose.connection.close().then(() => {
    console.log("Database connection closed")
  })
})

ava.serial("Dummy blogs are added to Mongo", async (test) => {
  const response = await mockAPI.get("/api/blogs")
  // The test database is empty, for now
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
    upvotes: 4
  }
  await mockAPI
    .post("/api/blogs")
    .send(newBlog)
  const response = await mockAPI.get("/api/blogs")
  test.is(response.body.length, dummyBlogs.length + 1)
  const authors = response.body.map((blog) => blog.author)
  test.true(authors.includes("Almach"))
  const titles = response.body.map((blog) => blog.title)
  test.true(titles.includes("Abdul Rahman al Ghafiqi"))
})

ava.serial("Missing title or author throws", async (test) => {
  const authorMissing = {
    title: "Yamra",
    upvotes: 2
  }
  await mockAPI
    .post("/api/blogs")
    .send(authorMissing)
    .expect(400)
  const titleMissing = {
    author: "Titans Fall Harder",
    upvotes: 7
  }
  await mockAPI
    .post("/api/blogs")
    .send(titleMissing)
    .expect(400)
  const response = await mockAPI.get("/api/blogs")
  test.is(response.body.length, dummyBlogs.length)
})

ava.serial("getBlogs", async (test) => {
  const blogs = await blogHelper.getBlogs()
  test.is(blogs.length, dummyBlogs.length)
})

ava.serial("Get by ID works", async (test) => {
  const blogs = await blogHelper.getBlogs()
  const firstBlog = blogs[0]

  const {body: blogByID} = await mockAPI
    .get(`/api/blogs/${firstBlog.id}`)
    .expect(200)
  test.deepEqual(blogByID, firstBlog)
})

ava.serial("Deletion works", async (test) => {
  const blogs = await blogHelper.getBlogs()
  const firstBlog = blogs[0]
  await mockAPI
    .delete(`/api/blogs/${firstBlog.id}`)
    // do you really need to expect a 204 though?
    // it always returns 204
    .expect(204)
  const oneLessBlog = await blogHelper.getBlogs()
  test.is(blogs.length - 1, oneLessBlog.length)
  const authors = oneLessBlog.map((blog) => blog.author)
  test.false(authors.includes("Li'l Jon"))
  test.true(!authors.includes("Li'l Jon"))
})

ava.serial("_id is renamed into id", async (test) => {
  const blogs = await blogHelper.getBlogs()
  const secondBlog = blogs[1]
  test.truthy(secondBlog.id)
  test.falsy(secondBlog._id)
})

ava.serial("Blogs with no upvotes can be added", async (test) => {
  const newBlog = {
    author: "Humphrey's Clock",
    title: "Euphoria of Poetry"
  }
  const {body: addedBlog} = await mockAPI
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
  test.is(addedBlog.upvotes, 0)
  test.not(addedBlog.upvotes, undefined)
})
