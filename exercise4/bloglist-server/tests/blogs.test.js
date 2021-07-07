const describe = require("ava")
const blogHelper = require("../utilities/blog_helper")

describe("Total upvotes", (test) => {
  const blogs = [
    {
      upvotes: 2
    },
    {
      upvotes: 5
    }
  ]
  test.is(
    blogHelper.calculateUpvotes(blogs),
    7,
    "of several blogs equals the sum of upvotes"
  )
  test.is(
    blogHelper.calculateUpvotes([]),
    0,
    "of zero blogs is zero"
  )
  test.is(
    blogHelper.calculateUpvotes([{upvotes: 3}]),
    3,
    "of one blog equals the upvotes of that singular blog"
  )
})
