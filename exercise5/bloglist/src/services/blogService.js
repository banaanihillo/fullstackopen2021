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
}

export default {
  getBlogs,
  addBlog,
  setToken
}
