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

const mostBlogs = (blogs) => {
  return getHighestValue(blogs, "blogs")
}

const favoriteAuthor = (blogs) => {
  return getHighestValue(blogs, "upvotes")
}

/**
 * @param {array} listOfBlogs
 * @param {string} property: The author statistic value to observe
 * @returns {object} The author with the highest such value
 */
const getHighestValue = (listOfBlogs, property) => {
  const authors = getAuthorStatistics(listOfBlogs)
  const properties = Object.values(authors).map((author) => {
    return author[property]
  })
  const highestValue = Math.max(...properties)
  for (const [author, statistics] of Object.entries(authors)) {
    if (statistics[property] === highestValue) {
      return {
        author,
        [property]: statistics[property]
      }
    }
  }
}

module.exports = {
  calculateUpvotes,
  favoriteBlog,
  mostBlogs,
  favoriteAuthor
}
