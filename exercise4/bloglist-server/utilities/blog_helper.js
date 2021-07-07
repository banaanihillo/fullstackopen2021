const calculateSum = (array, property) => {
  return array.reduce((accumulator, currentValue) => {
    return (accumulator + (currentValue[property] || currentValue))
  }, 0)
}

const calculateUpvotes = (array) => {
  return calculateSum(array, "upvotes")
}

const mostUpvotes = (array) => {
  return array.reduce((accumulator, currentValue) => {
    return (
      accumulator > currentValue.upvotes
        ? accumulator
        : currentValue.upvotes
    )
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.find((blog) => {
    return blog.upvotes === mostUpvotes(blogs)
  })
}

const getAuthorStatistics = (blogs) => {
  let authors = {}
  blogs.map((blog) => {
    // Optional chaining (?.) not available pre-Node v14,
    // so handle it separately here
    if (!authors[blog.author]) {
      authors[blog.author] = {
        blogs: 0,
        upvotes: 0
      }
    }
    authors[blog.author] = {
      blogs: authors[blog.author].blogs + 1,
      upvotes: authors[blog.author].upvotes + blog.upvotes
    }
  })
  return authors
}

const mostBlogs = (listOfBlogs) => {
  const authors = getAuthorStatistics(listOfBlogs)
  const numberOfBlogs = Object.values(authors).map((author) => {
    return author.blogs
  })
  const mostBlogsAuthored = Math.max(...numberOfBlogs)
  for (const [author, statistics] of Object.entries(authors)) {
    if (statistics.blogs === mostBlogsAuthored) {
      return {
        author,
        blogs: statistics.blogs
      }
    }
  }
}

module.exports = {
  calculateUpvotes,
  favoriteBlog,
  mostBlogs
}
