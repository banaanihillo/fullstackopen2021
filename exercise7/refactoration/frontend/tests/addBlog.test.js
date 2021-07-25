import ava from "ava"
import Vue from "vue"
import AddBlog from "../src/components/AddBlog.vue"
import {mount} from "@vue/test-utils"

Vue.config.productionTip = false

ava("Form submission works", async (test) => {
  const blogForm = mount(AddBlog)

  let inputFields = await blogForm.findAll("input")

  let titleInput = inputFields.at(0)
  await titleInput.setValue("Distant Shores")
  let authorInput = inputFields.at(1)
  await authorInput.setValue("Sam Dillard")
  let urlInput = inputFields.at(2)
  await urlInput.setValue("https://samostudios.bandcamp.com")

  await blogForm.trigger("submit")
  const formSubmission = blogForm.emitted()["add-blog"][0][0]
  test.is(
    formSubmission.title,
    "Distant Shores"
  )
  test.is(
    formSubmission.author,
    "Sam Dillard"
  )
  test.is(
    formSubmission.url,
    "https://samostudios.bandcamp.com"
  )
})
