import { Guid } from '../../presentation/protocols/http'

interface Account {
  id: Guid
  email: string
  name: string
  password: string
}

export { Account }
