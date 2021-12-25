import { UnautorizedError } from '../errors/UnautorizedError'
import { StatusCode, HttpResponseMessage } from '../../protocols/http'

const unautorized = (): HttpResponseMessage => ({
  statusCode: StatusCode.UNAUTORIZED,
  body: {
    error: new UnautorizedError().message
  }
})

export { unautorized }
