import { Account } from '../../../../domain/models'
import { AddAccountRepository } from '../../../../data/protocols'
import { AddAccountRequestDTO } from '../../../../domain/useCases'
import { MongoHelperConnection } from '../helpers/MongoHelperConnection'

class AccountMongoRepository implements AddAccountRepository {
  async add (addAccount: AddAccountRequestDTO): Promise<Account> {
    const accountCollection = await MongoHelperConnection
      .getCollection('accounts')

    const { insertedId } = await accountCollection.insertOne(addAccount)
    return {
      id: insertedId.toString(),
      ...addAccount
    }
  }
}

export { AccountMongoRepository }
