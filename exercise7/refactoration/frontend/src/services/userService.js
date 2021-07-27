import axios from "axios"
const baseURL = "http://localhost:3001/api/users"

const getUsers = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const getUserByID = async (userID) => {
  const response = await axios.get(`${baseURL}/${userID}`)
  return response.data
}

export default {
  getUsers,
  getUserByID
}
