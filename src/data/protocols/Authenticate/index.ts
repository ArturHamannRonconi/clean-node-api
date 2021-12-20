import { Guid } from '../../../domain/protocols/Guid'

interface Authenticate {
  auth: (id: Guid) => Promise<string>
}

export { Authenticate }
