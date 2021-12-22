import { Authenticate } from '../../../data/protocols'
import { AuthenticateJWTAdapter } from '../../../infra/providers/Authentication/AuthenticateJWTAdapter'

const { JWT_SECRET, JWT_EXPIRES } = process.env

const authenticateFactory = (): Authenticate => new AuthenticateJWTAdapter(
  JWT_SECRET,
  JWT_EXPIRES
)

export { authenticateFactory }
