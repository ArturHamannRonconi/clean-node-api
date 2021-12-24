import { Account } from '../../../../../domain/models'
import { AddAccountRepository, FindAccountRepository } from '../../../../../data/protocols'
import { AddAccountRequestDTO } from '../../../../../domain/useCases/AddAccountUseCase'
import { MongoHelperConnection } from '../helpers/MongoHelperConnection'
import { ObjectId } from 'mongodb'

class AccountMongoRepository implements AddAccountRepository, FindAccountRepository {
  async byId (id: string): Promise<Account> {
    const accountCollection = await MongoHelperConnection
      .getCollection('accounts')

    const document = await accountCollection
      .findOne(new ObjectId(id))

    if (!document) return null

    return MongoHelperConnection.map<Account>(document)
  }

  async byEmail (email: string): Promise<Account> {
    const accountCollection = await MongoHelperConnection
      .getCollection('accounts')

    const document = await accountCollection.findOne({ email })

    if (!document) return null

    return MongoHelperConnection.map<Account>(document)
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
