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

const updateAnecdote = async (anecdoteToUpdate) => {
  const response = await axios.patch(
    `${baseURL}/${anecdoteToUpdate.id}`,
    anecdoteToUpdate
  )
  return response.data
}

const getAnecdoteByID = async (anecdoteID) => {
  const response = await axios.get(`${baseURL}/${anecdoteID}`)
  return response.data
}

export default {
  getAnecdotes,
  addAnecdote,
  updateAnecdote,
  getAnecdoteByID
}
