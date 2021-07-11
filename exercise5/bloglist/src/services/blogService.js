import axios from "axios"
const baseURL = "http://localhost:3001/api/blogs"

let _token = null

const setToken = (token) => {
  _token = `Bearer ${token}`
}

const getBlogs = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const addBlog = async (blogInput) => {
  try {
    const configuration = {
      headers: {
        Authorization: _token
      }
    }
    const response = await axios.post(
      baseURL,
      blogInput,
      configuration
    )
    return response.data
  } catch (exception) {
    // this should be impossible to trigger from the browser though
    throw new Error(exception.response.data.error)
  }
}

export default {
  getBlogs,
  addBlog,
  setToken
}
