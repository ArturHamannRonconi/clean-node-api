import { MongoHelperConnection as sut } from './MongoHelperConnection'

const { MONGO_URL } = process.env

describe('MongoHelper', () => {
  beforeAll(async () => await sut.connect(MONGO_URL))
  afterAll(async () => await sut.disconnect())

  it('Should Reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()

    await sut.disconnect()

    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
