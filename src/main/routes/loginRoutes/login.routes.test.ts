import request from 'supertest'

import { app } from '../../app'
import { MongoHelperConnection } from '../../../infra/database/mongodb/helpers/MongoHelperConnection'

const { MONGO_URL } = process.env

describe('Sign Up routes', () => {
  beforeAll(async () => await MongoHelperConnection.connect(MONGO_URL))
  afterAll(async () => await MongoHelperConnection.disconnect())
  afterEach(async () => {
    const collection = await MongoHelperConnection
      .getCollection('accounts')

    await collection.deleteMany({})
  })

  describe('POST Sign Up', () => {
    it('Should return 201 on success', async () => {
      await request(app)
        .post('/api/v1/login/sign-up')
        .send({
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'a44638qewq92!A',
          passwordConfirmation: 'a44638qewq92!A'
        })
        .expect(201)
    })
  })
})