import { Guid } from '../../../presentation/protocols/http'

interface AddAccountResponseDTO {
  id: Guid
  email: string
  name: string
}

export { AddAccountResponseDTO }
