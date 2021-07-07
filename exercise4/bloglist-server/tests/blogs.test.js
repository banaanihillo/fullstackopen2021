const describe = require("ava")
const blogHelper = require("../utilities/blog_helper")


const blogs = [
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    upvotes: 2
  },
  {
    title: "Within Dark Dreams",
    author: "Mist of Misery",
    upvotes: 5
  }
]

describe("Total upvotes", (test) => {
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

describe("Favorite blog", (test) => {
  test.deepEqual(
    blogHelper.favoriteBlog(blogs),
    {
      title: "Within Dark Dreams",
      author: "Mist of Misery",
      upvotes: 5
    },
    "among several blogs is the most upvoted blog"
  )
  test.deepEqual(
    blogHelper.favoriteBlog((blogs.slice(0, 1))),
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      upvotes: 2
    },
    "with a parameter of just one blog is said blog"
  )
  test.is(
    blogHelper.favoriteBlog([]),
    undefined,
    "among no blogs is (not found)"
  )
})
