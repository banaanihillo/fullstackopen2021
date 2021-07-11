import axios from "axios"
const baseURL = "http://localhost:3001/api/blogs"

const getBlogs = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

export default {
  getBlogs
}
