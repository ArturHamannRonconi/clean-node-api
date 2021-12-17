import { UnautorizedError } from '../errors/UnautorizedError'
import { StatusCode, HttpResponseMessage } from '../protocols'

const unautorized = (): HttpResponseMessage => ({
  statusCode: StatusCode.UNAUTORIZED,
  body: new UnautorizedError()
})

export { unautorized }
