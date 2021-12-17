import { Guid } from '../../../presentation/protocols'

interface AddAccountResponseDTO {
  id: Guid
  email: string
  name: string
}

export { AddAccountResponseDTO }
