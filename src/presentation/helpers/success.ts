import { HttpResponseMessage, Json, StatusCode } from '../protocols'

const success = (data: Json): HttpResponseMessage => ({
  statusCode: StatusCode.SUCCESS,
  body: data
})

export { success }
