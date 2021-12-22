import { Account } from '../../../../domain/models'

interface FindAccountRepository {
  byEmail: (email: string) => Promise<Account>
}

export { FindAccountRepository }
