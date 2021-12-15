import { HttpResponseMessage, Json, StatusCode } from '../protocols'

const created = (data: Json): HttpResponseMessage => ({
  statusCode: StatusCode.CREATED,
  body: data
})

export { created }
