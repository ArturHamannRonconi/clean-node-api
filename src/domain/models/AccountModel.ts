import { Guid } from '../../presentation/protocols'

interface AccountModel {
  id: Guid
  email: string
  name: string
}

export { AccountModel }
