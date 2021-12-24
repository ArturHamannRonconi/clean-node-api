import { Entity } from '.'
import { Role } from '../protocols/Role'

interface Account extends Entity {
  email: string
  name: string
  password: string
  role: Role
}

export { Account }
