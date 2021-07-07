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

module.exports = {
  calculateUpvotes,
  favoriteBlog
}
