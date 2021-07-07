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
  },
  {
    title: "Stormblåst",
    author: "Mist of Misery",
    upvotes: 4
  }
]

describe("Total upvotes", (test) => {
  test.is(
    blogHelper.calculateUpvotes(blogs),
    11,
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

describe("mostBlogs", (test) => {
  test.deepEqual(
    blogHelper.mostBlogs(blogs),
    {
      author: "Mist of Misery",
      blogs: 2
    },
    "among several blogs returns the author with the most blogs"
  )
  test.is(
    blogHelper.mostBlogs([]),
    undefined,
    "among no blogs is (not defined)"
  )
  test.deepEqual(
    blogHelper.mostBlogs(blogs.slice(-1)),
    {
      author: "Mist of Misery",
      blogs: 1
    },
    "with a parameter of one blog returns that author"
  )
})
