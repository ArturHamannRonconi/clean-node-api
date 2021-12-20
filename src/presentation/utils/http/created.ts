import { HttpResponseMessage, Json, StatusCode } from '../../protocols/http'

const created = (data: Json): HttpResponseMessage => ({
  statusCode: StatusCode.CREATED,
  body: data
})

export { created }
