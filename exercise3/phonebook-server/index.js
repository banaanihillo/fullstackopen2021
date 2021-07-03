const express = require("express")
const morgan = require("morgan")
const app = express()
app.use(express.json())

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

let dummyPeople = [
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

app.delete("/api/people/:id", (request, response) => {
  dummyPeople = dummyPeople.filter((person) => {
    return person.id !== request.params.id
  })
  response.status(204).end()
})

app.post("/api/people", (request, response) => {
  if (!request.body.name || !request.body.number) {
    return response.status(400).json({
      error: "Name and number are required."
    })
  }

  // can people have duplicate numbers though? apparently they can
  if (dummyPeople.find((person) => {
    return person.name === request.body.name
  })) {
    return response.status(400).json({
      error: `${request.body.name} already exists.`
    })
  }

  const newPerson = {
    name: request.body.name,
    number: request.body.number,
    id: `${Math.floor(Math.random() * 900600)} bananas`
  }
  dummyPeople = [
    ...dummyPeople,
    newPerson
  ]
  response.send(dummyPeople)
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
