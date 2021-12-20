import { Guid } from '../../../domain/protocols/Guid'
import { Tokens } from './Tokens'

interface Authenticate {
  auth: (id: Guid) => Promise<Tokens>
}

export { Authenticate }
