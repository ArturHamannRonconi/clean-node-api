import { HttpResponseMessage, Json, StatusCode } from '../../protocols/http'

const success = (data: Json): HttpResponseMessage => ({
  statusCode: StatusCode.SUCCESS,
  body: data
})

export { success }
