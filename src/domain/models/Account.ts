import { Guid } from '../protocols/Guid'

interface Account {
  id: Guid
  email: string
  name: string
  password: string
}

export { Account }
