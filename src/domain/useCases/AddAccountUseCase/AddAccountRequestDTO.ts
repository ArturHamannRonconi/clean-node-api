import { Role } from '../../protocols/Role'

interface AddAccountRequestDTO {
  readonly name: string
  readonly email: string
  readonly password: string
  readonly role: Role
}

export { AddAccountRequestDTO }
