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

const addAuthorizationHeader = () => {
  return {
    headers: {
      Authorization: _token
    }
  }
}

const addBlog = async (blogInput) => {
  try {
    const response = await axios.post(
      baseURL,
      blogInput,
      addAuthorizationHeader()
    )
    return response.data
  } catch (exception) {
    // this should be impossible to trigger from the browser though
    throw new Error(exception.response.data.error)
  }
}

const addUpvote = async (blog) => {
  const response = await axios.patch(
    `${baseURL}/${blog.id}`,
    blog
  )
  return response.data
}

const deleteBlog = async (blogID) => {
  try {
    await axios.delete(
      `${baseURL}/${blogID}`,
      addAuthorizationHeader()
    )
  } catch (exception) {
    throw new Error(exception.response.data.error)
  }
}

const getBlogByID = async (blogID) => {
  const response = await axios.get(`${baseURL}/${blogID}`)
  return response.data
}

const addComment = async (blogID, comment) => {
  const response = await axios.post(
    `${baseURL}/${blogID}/comments`,
    {
      comment
    }
  )
  return response.data
}

export default {
  getBlogs,
  addBlog,
  setToken,
  addUpvote,
  deleteBlog,
  getBlogByID,
  addComment
}
