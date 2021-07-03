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
    id: "a7a7a7a7",
    name: "Hillo Banaan",
    number: "6-HLL-BBNN"
  }
]

app.get("/api/people", (_request, response) => {
  response.send(dummyPeople)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
