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

app.get("/info", async (_request, response) => {
  const people = await Person.find({})
  response.send(`
    <p> The phonebook contains ${people.length} ${
      people.length === 1
        ? "person"
        : "people"
    }. </p>
    <p>
      Observation date: ${new Date().toISOString()}
    </p>
  `)
})

app.get("/api/people/:id", async (request, response, next) => {
  try {
    const person = await Person.findById(request.params.id)
    if (!person) {
      return response.status(404).json({
        error: `No people found with ID ${request.params.id}.`
      })
    }
    response.json(person)
  } catch (error) {
    return next(error)
  }
})

app.delete("/api/people/:id", async (request, response) => {
  await Person.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

app.post("/api/people", async (request, response, next) => {
  try {
    const newPerson = new Person({
      name: request.body.name,
      number: request.body.number
    })
    const savedPerson = await newPerson.save()
    response.json(savedPerson)
  } catch (error) {
    return next(error)
  }
})

app.patch("/api/people/:id", async (request, response) => {
  if (!request.body.number) {
    return response.status(400).json({
      error: "No number replacement given."
    })
  }
  const updatedPerson = await Person.findByIdAndUpdate(
    request.params.id,
    {
      number: request.body.number
    },
    {
      new: true
    }
  )
  response.json(updatedPerson)
})

const notFound = (request, response) => {
  response.status(404).send({
    error: `No such address found: ${request.url}`
  })
}
app.use(notFound)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === "CastError") {
    return response.status(400).send({
      error: `Malformed ID ${request.params.id}. ${error}`
    })
  } else if (error.name === "ValidationError") {
    return response.status(400).send({
      error: error.message
    })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
