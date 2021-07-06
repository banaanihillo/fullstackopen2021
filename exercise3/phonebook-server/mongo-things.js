const mongoose = require("mongoose")
require("dotenv").config()

if (process.argv.length > 4 || process.argv.length === 3) {
  throw new Error(`Usage:
    mongo-things
    mongo-things <new name> <new number>
  `)
}

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
).catch((error) => {
  throw new Error(`Could not connect to Mongo. ${error}`)
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model("Person", personSchema)

if (process.argv.length === 4) {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
  })

  person.save()
    .then((result) => {
      console.log(`Successfully added ${result.name}.`)
    })
    .catch((error) => {
      throw new Error(`Person addition unsuccessful. ${error}`)
    })
    .finally(() => {
      mongoose.connection.close()
    })
} else {
  Person
    .find({})
    .then((people) => {
      people.map((person) => {
        console.log(person)
      })
    })
    .finally(() => {
      mongoose.connection.close()
    })
}
