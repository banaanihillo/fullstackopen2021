import axios from "axios"
const baseURL = "http://localhost:3001/api/login"

const logIn = async (credentials) => {
  try {
    const response = await axios.post(baseURL, credentials)
    return response.data
  } catch (exception) {
    throw new Error(exception.response.data.error)
  }
}

export default {
  logIn
}
