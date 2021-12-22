import request from 'supertest'

import { app } from '../../app'
import { MongoHelperConnection } from '../../../infra/repositories/database/mongodb/helpers/MongoHelperConnection'
import { SignUpHttpRequestBody } from '../../../presentation/controllers/SignUpController/SignUpHttpRequestBody'

const { MONGO_URL } = process.env

const fakeAccount = (): SignUpHttpRequestBody => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'a44638qewq92!A',
  passwordConfirmation: 'a44638qewq92!A'
})

describe('Login routes', () => {
  beforeAll(async () => await MongoHelperConnection.connect(MONGO_URL))
  afterAll(async () => await MongoHelperConnection.disconnect())
  afterEach(async () => {
    const collection = await MongoHelperConnection
      .getCollection('accounts')

    await collection.deleteMany({})
  })

  describe('Sign Up', () => {
    it('Should return 201 on success', async () => {
      await request(app)
        .post('/api/v1/login/sign-up')
        .send(fakeAccount())
        .expect(201)
    })
  })

  describe('Sign In', () => {
    it('Should return 200 on success', async () => {
      const { email, password } = fakeAccount()

      await request(app)
        .post('/api/v1/login/sign-up')
        .send(fakeAccount())

      const response = await request(app)
        .post('/api/v1/login/sign-in')
        .send({ email, password })
        .expect(200)

      expect(response.body).toHaveProperty('accessToken')
    })
  })
})
