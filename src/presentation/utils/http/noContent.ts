import { HttpResponseMessage, StatusCode } from '../../protocols/http'

const noContent = (): HttpResponseMessage => ({
  statusCode: StatusCode.NO_CONTENT
})

export { noContent }
