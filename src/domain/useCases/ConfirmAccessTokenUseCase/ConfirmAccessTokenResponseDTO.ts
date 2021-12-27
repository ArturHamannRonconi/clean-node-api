import { Guid } from '../../protocols/Guid'
import { Role } from '../../protocols/Role'

interface ConfirmAccessTokenResponseDTO {
  accountId: Guid
  role: Role
}

export { ConfirmAccessTokenResponseDTO }
