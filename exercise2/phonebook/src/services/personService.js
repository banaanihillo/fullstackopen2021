import axios from "axios"
const baseAddress = "http://localhost:3000/people"

export const getNotes = async () => {
  const response = await axios.get("http://localhost:3000/people")
  return response.data
}

export const addPerson = async (input) => {
  const response = await axios.post(
    baseAddress,
    input
  )
  return response.data
}
