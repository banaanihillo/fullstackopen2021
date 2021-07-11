import axios from "axios"
const baseURL = "http://localhost:3001/api/login"

const logIn = async (credentials) => {
  const response = await axios.post(baseURL, credentials)
  return response.data
}

export default {
  logIn
}
