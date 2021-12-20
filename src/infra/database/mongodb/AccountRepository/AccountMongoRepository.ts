import { Account } from '../../../../domain/models'
import { AddAccountRepository, FindAccountRepository } from '../../../../data/protocols'
import { AddAccountRequestDTO } from '../../../../domain/useCases/AddAccountUseCase'
import { MongoHelperConnection } from '../helpers/MongoHelperConnection'

class AccountMongoRepository implements AddAccountRepository, FindAccountRepository {
  async byEmail (email: string): Promise<Account> {
    const accountCollection = await MongoHelperConnection
      .getCollection('accounts')

    const document = await accountCollection.findOne({ email })

    if (!document) return null

    return {
      id: document._id.toString(),
      email: document.email,
      name: document.name,
      password: document.password
    }
  }

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
