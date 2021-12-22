import { Guid } from '../../../../domain/protocols/Guid'

interface UpdateTokenRepository {
  byId: (id: Guid, token: string) => Promise<void>
}

export { UpdateTokenRepository }
