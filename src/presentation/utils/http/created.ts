import { HttpResponseMessage, StatusCode } from '../../protocols/http'

const created = (): HttpResponseMessage => ({
  statusCode: StatusCode.CREATED
})

export { created }
