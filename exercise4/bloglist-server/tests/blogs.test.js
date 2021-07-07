const describe = require("ava")
const blogHelper = require("../utilities/blog_helper")

describe("dummy", (test) => {
  const blogs = []
  const result = blogHelper.dummy(blogs)
  test.is(result, "Just a dummy")
})
