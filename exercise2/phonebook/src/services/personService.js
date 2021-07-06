import axios from "axios"
const baseAddress = "/api/people"

export const getNotes = async () => {
  const response = await axios.get(baseAddress)
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

  await axios.delete(
    `${baseAddress}/${id}`
  )
  
}

export const updateNumber = async (id, number) => {

  const response = await axios.patch(
    `${baseAddress}/${id}`,
    {
      number
    }
  )
  return response.data

}
