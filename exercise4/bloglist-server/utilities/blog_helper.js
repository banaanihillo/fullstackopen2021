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

const numberOfBlogs = (blogs) => {
  let blogCounts = {}
  blogs.map((blog) => {
    if (!blogCounts[blog.author]) {
      blogCounts[blog.author] = 0
    }
    blogCounts[blog.author]++
  })
  return blogCounts
}

const mostBlogs = (listOfBlogs) => {
  const authors = numberOfBlogs(listOfBlogs)
  const mostBlogsAuthored = Math.max(...Object.values(authors))
  for (const [author, blogs] of Object.entries(authors)) {
    if (blogs === mostBlogsAuthored) {
      return {
        author,
        blogs
      }
    }
  }
}

module.exports = {
  calculateUpvotes,
  favoriteBlog,
  mostBlogs
}
