import { Guid } from '../../../domain/protocols/Guid'

interface ReaderAuthentication {
  readAccessToken: (accessToken: string) => Promise<Guid>
}

export { ReaderAuthentication }
