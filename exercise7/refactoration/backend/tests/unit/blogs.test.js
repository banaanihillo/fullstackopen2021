const describe = require("ava")
const testHelper = require("../../utilities/test_helper")


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
    testHelper.calculateUpvotes(blogs),
    11,
    "of several blogs equals the sum of upvotes"
  )
  test.is(
    testHelper.calculateUpvotes([]),
    0,
    "of zero blogs is zero"
  )
  test.is(
    testHelper.calculateUpvotes([{upvotes: 3}]),
    3,
    "of one blog equals the upvotes of that singular blog"
  )
})

describe("Favorite blog", (test) => {
  test.deepEqual(
    testHelper.favoriteBlog(blogs),
    {
      title: "Within Dark Dreams",
      author: "Mist of Misery",
      upvotes: 5
    },
    "among several blogs is the most upvoted blog"
  )
  test.deepEqual(
    testHelper.favoriteBlog((blogs.slice(0, 1))),
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      upvotes: 2
    },
    "with a parameter of just one blog is said blog"
  )
  test.is(
    testHelper.favoriteBlog([]),
    undefined,
    "among no blogs is (not found)"
  )
})

describe("mostBlogs", (test) => {
  test.deepEqual(
    testHelper.mostBlogs(blogs),
    {
      author: "Mist of Misery",
      blogs: 2
    },
    "among several blogs returns the author with the most blogs"
  )
  test.is(
    testHelper.mostBlogs([]),
    undefined,
    "among no blogs is (not defined)"
  )
  test.deepEqual(
    testHelper.mostBlogs(blogs.slice(-1)),
    {
      author: "Mist of Misery",
      blogs: 1
    },
    "with a parameter of one blog returns that author"
  )
})

describe("Most upvoted author", (test) => {
  test.deepEqual(
    testHelper.favoriteAuthor(blogs),
    {
      author: "Mist of Misery",
      upvotes: 9
    },
    "among several blogs is the author whose blogs have most upvotes"
  )
  test.is(
    testHelper.favoriteAuthor([]),
    undefined,
    "among no blogs is (not defined)"
  )
  test.deepEqual(
    testHelper.favoriteAuthor(blogs.slice(-2, -1)),
    {
      author: "Mist of Misery",
      upvotes: 5
    },
    "with a parameter of one blog returns that blog's upvotes"
  )
})
