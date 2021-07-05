const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const connectToDatabase = require("./database")
connectToDatabase()
const Person = require("./models/personModel")

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("dist"))

morgan.token("requestBody", (request, _response) => {
  if (request.method === "POST") {
    return JSON.stringify(request.body)
  }
})
app.use(morgan((tokens, request, response) => {
  return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens["response-time"](request, response) + "ms",
    tokens.requestBody(request, response)
  ].join("  ")
}))



app.get("/api/people", (_request, response) => {
  Person
    .find({})
    .then((people) => {
      response.json(people)
    })
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

app.get("/api/people/:id", async (request, response) => {
  const person = await Person.findById(request.params.id)
  if (!person) {
    return response.status(404).json({
      error: `No people found with ID ${request.params.id}.`
    })
  }
  response.json(person)
})

app.delete("/api/people/:id", async (request, response) => {
  await Person.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

app.post("/api/people", async (request, response) => {
  if (!request.body.name || !request.body.number) {
    return response.status(400).json({
      error: "Name and number are required."
    })
  }

  // can people have duplicate numbers though? apparently they can
  const alreadyExists = await Person.findOne({
    name: request.body.name
  })
  if (alreadyExists) {
    return response.status(400).json({
      error: `${request.body.name} already exists.`
    })
  }

  const newPerson = new Person({
    name: request.body.name,
    number: request.body.number
  })
  const savedPerson = await newPerson.save()
  response.json(savedPerson)
})

const notFound = (request, response) => {
  response.status(404).send({
    error: `No such address found: ${request.url}`
  })
}
app.use(notFound)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
