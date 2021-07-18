import ava from "ava"
import Vue from "vue"
import App from "../src/App.vue"
import Blog from "../src/components/Blog.vue"
import {mount} from "@vue/test-utils"

Vue.config.productionTip = false

// Assign the mounted App component
let wrapper = null
ava.beforeEach(() => {
  wrapper = mount(
    App,
    {
      data() {
        return {
          loggedIn: {
            userName: "Not a real user"
          },
          blogs: [
            {
              title: "Unholy Trinity",
              author: "Denial of Death",
              url: "http://localhost:3001",
              upvotes: 0,
              user: {
                userName: "Not a real user"
              }
            }
          ]
        }
      }
    }
  )
})

ava("Renders log-in information", (test) => {
  test.false(
    wrapper.text().includes("Log in"),
    "The fake user passed in is initially logged in, kind of"
  )
  test.true(
    wrapper.text().includes("Logged in as Not a real user"),
    "Not a real user is logged in"
  )
})

ava("Render a single blog", (test) => {
  // The list of blogs only includes that thing passed in above
  const blogWrapper = wrapper.getComponent(Blog)

  test.true(
    blogWrapper.text().includes("Unholy Trinity - by Denial of Death"),
    "Blog component includes basic information - title and author"
  )
})

ava.serial("Renders expanded blog information", async (test) => {
  const blogWrapper = wrapper.getComponent(Blog)

  await blogWrapper
    .get(".expand")
    .trigger("click")
  test.true(
    blogWrapper.text().includes("Upvotes"),
    "Expanded information includes upvotes"
  )
  test.true(
    blogWrapper.text().includes("Collapse"),
    "Expanded information includes the collapse button"
  )
  await blogWrapper
    .get(".collapse")
    .trigger("click")
  test.false(
    blogWrapper.text().includes("Upvotes"),
    "The expanded information is closed once collapse has been clicked"
  )
})

ava("Expanded information is not shown by default", (test) => {
  const blogWrapper = wrapper.getComponent(Blog)

  test.false(
    blogWrapper.text().includes("localhost"),
    "Exludes the blog address by default"
  )
  test.false(
    blogWrapper.text().includes("Upvotes"),
    "Excludes the upvotes by default"
  )
})

ava.serial("Upvote incremention works", async (test) => {
  const blogWrapper = wrapper.getComponent(Blog)

  await blogWrapper
    .get(".expand")
    .trigger("click")
  test.true(
    blogWrapper.text().includes("Upvotes: 0"),
    "No upvotes by default"
  )

  const upvoteButton = await blogWrapper.get(".upvote")
  await upvoteButton.trigger("click")
  await upvoteButton.trigger("click")
  test.is(
    blogWrapper.emitted()["add-upvote"].length,
    2,
    "The custom event emission was twice triggered"
  )
})
