import { Guid } from '../../presentation/protocols'

interface Account {
  id: Guid
  email: string
  name: string
}

export { Account }
