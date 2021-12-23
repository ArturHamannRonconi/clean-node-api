import { Role } from '../../protocols/Role'

interface ConfirmAccessTokenRequestDTO {
  authorization: string
  role: Role
}

export { ConfirmAccessTokenRequestDTO }
