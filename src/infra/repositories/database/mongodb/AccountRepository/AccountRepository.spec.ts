import { AddAccountRequestDTO } from '../../../../../domain/useCases/AddAccountUseCase/AddAccountRequestDTO'
import { MongoHelperConnection } from '../helpers/MongoHelperConnection'
import { AccountMongoRepository } from './AccountMongoRepository'

const { MONGO_URL } = process.env

const makeSUT = (): AccountMongoRepository => new AccountMongoRepository()
const makeFakeAccount = (): AddAccountRequestDTO => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

describe('Account Mongo Repository', () => {
  beforeAll(async () => await MongoHelperConnection.connect(MONGO_URL))
  afterAll(async () => await MongoHelperConnection.disconnect())
  afterEach(async () => await (await MongoHelperConnection
    .getCollection('accounts'))
    .deleteMany({})
  )

  it('Should return an account on success', async () => {
    const sut = makeSUT()
    const account = await sut.add(makeFakeAccount())

    expect(account).toHaveProperty('id')
  })

  it('Should be able to return an account by email', async () => {
    const sut = makeSUT()
    const createdAccount = await sut.add(makeFakeAccount())
    const account = await sut.byEmail(
      makeFakeAccount().email
    )

    expect(createdAccount.id).toBe(account.id)
  })
})
