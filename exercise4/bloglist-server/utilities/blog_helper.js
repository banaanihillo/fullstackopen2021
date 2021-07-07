const calculateSum = (array, property) => {
  return array.reduce((accumulator, currentValue) => {
    return (accumulator + (currentValue[property] || currentValue))
  }, 0)
}

const calculateUpvotes = (array) => {
  return calculateSum(array, "upvotes")
}

module.exports = {
  calculateUpvotes
}
