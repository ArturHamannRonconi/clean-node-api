import { MongoHelperConnection } from '../helpers/MongoHelperConnection'
import { TokenMongoRepository } from './TokenMongoRepository'

const { MONGO_URL } = process.env

describe('Token Mongo Repository', () => {
  beforeAll(async () => await MongoHelperConnection.connect(MONGO_URL))
  afterAll(async () => await MongoHelperConnection.disconnect())
  afterEach(async () => await (await MongoHelperConnection
    .getCollection('accounts'))
    .deleteMany({})
  )

  it('Should update token on success', async () => {
    const sut = new TokenMongoRepository()
    const tokensCollection = await MongoHelperConnection
      .getCollection('tokens')

    const { insertedId } = await
    tokensCollection.insertOne({ accessToken: 'any_token' })

    await sut.byId(insertedId.toString(), 'any_token_2')
    const { accessToken } = await tokensCollection.findOne(insertedId)
    expect(accessToken).toBe('any_token_2')
  })
})
