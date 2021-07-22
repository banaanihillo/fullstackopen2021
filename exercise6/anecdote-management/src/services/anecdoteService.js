import axios from "axios"
const baseURL = "http://localhost:3000/anecdotes"

const getAnecdotes = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const addAnecdote = async (newAnecdote) => {
  const response = await axios.post(baseURL, newAnecdote)
  return response.data
}

export default {
  getAnecdotes,
  addAnecdote
}
