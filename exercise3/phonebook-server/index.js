const express = require("express")
const app = express()
app.use(express.json())

const dummyPeople = [
  {
    id: "ahahahhaahghahahahahhhhhhhhhhaaaaaaaaa",
    name: "Banana Hillo",
    number: "1-800-BHLL"
  }/* ,
  {
    id: "a7a7a7a7",
    name: "Hillo Banaan",
    number: "6-HLL-BBNN"
  } */
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
