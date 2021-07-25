// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/**
 * @global cypress
 */
const cypress = cy

Cypress.Commands.add("logInAndNavigateBackHome", (credentials) => {
  cypress.request({
    url: "http://localhost:3001/api/login",
    method: "POST",
    body: {
      userName: credentials.userName,
      password: credentials.password
    }
  }).then((response) => {
    localStorage.setItem("loggedIn", JSON.stringify(response.body))
    cypress.visit("http://localhost:8080")
  })
})

Cypress.Commands.add("addBlogAndNavigateBackHome", (blog) => {
  const token = JSON.parse(localStorage.getItem("loggedIn")).token

  cypress.request({
    url: "http://localhost:3001/api/blogs",
    method: "POST",
    body: blog,
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }).then(() => {
    cypress.visit("http://localhost:8080")
  })
})
