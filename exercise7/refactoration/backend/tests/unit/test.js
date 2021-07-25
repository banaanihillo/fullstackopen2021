const describe = require("ava")

const palindrome = (string) => {
  return (string
    .split("")
    .reverse()
    .join("")
  )
}

const calculateSum = (array) => {
  return array.reduce((accumulator, currentValue) => {
    return (accumulator + currentValue)
  }, 0)
}

const average = (array) => {
  if (array.length === 0) {
    throw new Error("Division by zero")
  }
  return (calculateSum(array) / array.length)
}

describe("palindrome", (test) => {
  test.is(palindrome("bananab"), "bananab")
})

describe("not a palindrome", (test) => {
  test.not(palindrome("banana"), "banana")
})

describe("average", (test) => {
  test.is(average([10, 5]), 7.5)
})

describe("average of no numbers", (test) => {
  test.throws(() => {
    average([])
  })
})
