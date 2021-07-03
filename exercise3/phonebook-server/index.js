const express = require("express")
const app = express()
app.use(express.json())

const dummyPeople = [
  {
    id: "ahahahhaahghahahahahhhhhhhhhhaaaaaaaaa",
    name: "Banana Hillo",
    number: "1-800-BHLL"
  },
  {
    id: "a",
    name: "Hillo Banaan",
    number: "6-HLL-BBNN"
  }
]

app.get("/api/people", (_request, response) => {
  response.send(dummyPeople)
})

app.get("/info", (_request, response) => {
  response.send(`
    <p> The phonebook contains ${dummyPeople.length} ${
      dummyPeople.length === 1
        ? "person"
        : "people"
    }. </p>
    <p>
      Observation date: ${new Date().toISOString()}
    </p>
  `)
})

app.get("/api/people/:id", (request, response) => {
  const dummyPerson = dummyPeople.find((person) => {
    return person.id === request.params.id
  })
  if (!dummyPerson) {
    return response.status(404).json({
      error: `No people found with ID ${request.params.id}.`
    })
  }
  response.send(dummyPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
