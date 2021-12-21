import { Guid } from '../../protocols/Guid'

interface AddAccountResponseDTO {
  id: Guid
  email: string
  name: string
}

export { AddAccountResponseDTO }
