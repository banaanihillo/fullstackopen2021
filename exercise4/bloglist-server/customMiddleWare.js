const getToken = (request) => {
  const authorization = request.get("authorization")
  if (
    authorization
    && authorization.toLowerCase().startsWith("bearer ")
  ) {
    return authorization.slice(7)
  }
}
const tokenExtractor = (request, _response, next) => {
  const token = getToken(request)
  request.token = token
  next()
}

const notFound = (request, response) => {
  response.status(404).send({
    error: `No such address found: ${request.url}`
  })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  switch (error.name) {
    case "CastError":
      return response.status(400).send({
        error: `Malformed ID ${request.params.id}. ${error}`
      })
    case "ValidationError":
      return response.status(400).send({
        error: error.message
      })
    case "JsonWebTokenError":
      return response.status(401).send({
        error: `Invalid token. ${error.message}`
      })
    case "TokenExpiredError":
      return response.status(401).send({
        error: `Token expired. ${error.message}`
      })
  }

  next(error)
}

module.exports = {
  tokenExtractor,
  notFound,
  errorHandler
}
