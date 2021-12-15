import { MongoHelperConnection } from '../helpers/MongoHelperConnection'
import { AccountMongoRepository } from './AccountMongoRepository'

describe('Account Mongo Repository', () => {
  beforeAll(async () => await MongoHelperConnection.connect())
  afterAll(async () => await MongoHelperConnection.disconnect())
  afterEach(async () => await MongoHelperConnection
    .getCollection('accounts')
    .deleteMany({})
  )

  it('Should return an account on success', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(account).toHaveProperty('id')
  })
})
