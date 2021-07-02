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

export const deletePerson = async (id) => {
  try {
    await axios.delete(
      `${baseAddress}/${id}`
    )
  } catch (error) {
    return `Deletion of ${id} unsuccessful: ${error}`
  }
}

export const updateNumber = async (id, number) => {
  try {
    const response = await axios.patch(
      `${baseAddress}/${id}`,
      {
        number
      }
    )
    return response.data
  } catch (error) {
    throw new Error(`The person ${id} no longer exists: ${error}`)
  }
}
