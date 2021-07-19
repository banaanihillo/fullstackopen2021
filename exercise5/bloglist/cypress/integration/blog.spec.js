/**
 * @global describe, it, cy, beforeEach
 */

const testGroup = describe
const test = it
const cypress = cy
const beforeEachTest = beforeEach

beforeEachTest(() => {
  cypress.request(
    "POST",
    "http://localhost:3001/api/test/reset"
  )
  const testUser = {
    userName: "Banana Cypress",
    password: "Programmatically Filled Passphrase"
  }
  cypress.request(
    "POST",
    "http://localhost:3001/api/users",
    testUser
  )

  cypress.visit("http://localhost:8080")
})

testGroup("Blog thing", () => {
  test("front page shows the log-in button by default", () => {
    cypress.contains("Blogs")
    cypress.contains("Log in")
  })

  test("nonexistent log-in does not work", () => {
    cypress
      .get("#togglable-button")
      .click()
    cypress
      .get("#user-name-input")
      .type("Not Banaani Hillo")
    cypress
      .get("#password-input")
      .type("Not Banaani Hillo's Insecure Password")
    cypress
      .get("#log-in")
      .click()
    cypress.contains("User name and/or password incorrect")
  })
})

testGroup("When logged in", () => {
  beforeEachTest(() => {
    cypress.logInAndNavigateBackHome({
      userName: "Banana Cypress",
      password: "Programmatically Filled Passphrase"
    })
  })

  test("the user name is shown", () => {
    cypress.contains("Logged in as Banana Cypress.")
  })

  test("creation of new notes works", () => {
    cypress.addBlogAndNavigateBackHome({
      title: "Lugia's Song",
      author: "Kristin Naigus, Braxton Burks",
      url: "https://braxtonburks.bandcamp.com"
    })
    cypress.contains("Lugia's Song")
  })

  testGroup("and blogs already exist", () => {
    beforeEachTest(() => {
      cypress.addBlogAndNavigateBackHome({
        title: "Rumination",
        author: "Mouth of the Harlot",
        url: "https://mouthoftheharlot.bandcamp.com",
        upvotes: 2
      })
    })

    test("upvote incremention works", () => {
      cypress
        .contains("Rumination")
        .contains("Expand")
        .click()
      cypress
        .contains("Rumination")
        // The list item, containing all the paragraphs
        .parent()
        .contains("Upvote")
        .click()
      cypress
        .contains("Rumination")
        .parent()
        .contains("Upvotes: 3")
    })
  })
})
