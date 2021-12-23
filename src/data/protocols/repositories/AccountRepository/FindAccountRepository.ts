import { Account } from '../../../../domain/models'

interface FindAccountRepository {
  byEmail: (email: string) => Promise<Account>
  byId: (id: string) => Promise<Account>
}

export { FindAccountRepository }
