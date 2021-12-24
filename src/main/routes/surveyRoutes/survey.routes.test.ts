import request from 'supertest'

import { app } from '../../app'
import { MongoHelperConnection } from '../../../infra/repositories/database/mongodb/helpers/MongoHelperConnection'
import { AddSurveyRequestDTO } from '../../../domain/useCases/AddSurveyUseCase'
import { AddAccountRequestDTO } from '../../../domain/useCases/AddAccountUseCase'
import { Role } from '../../../domain/protocols/Role'

const { MONGO_URL } = process.env

const makeFakeSurvey = (): AddSurveyRequestDTO => ({
  question: 'any_question?',
  answers: [
    { answer: 'any_answer', image: 'any_image' }
  ]
})

const makeAdminAccount = (): AddAccountRequestDTO => ({
  name: 'adm',
  email: 'adm@mail.com',
  password: '$2a$12$9yCYZDQmj.9skVhaMbr/5eAA3g4wI5/zIaXm1/z27MnQLHRTWPDTm',
  role: Role.ADMIN
})

describe('survey routes', () => {
  let adminAccountToken: string

  beforeAll(async () => {
    await MongoHelperConnection.connect(MONGO_URL)
    const accountsCollection = await MongoHelperConnection
      .getCollection('accounts')

    await accountsCollection.insertOne(makeAdminAccount())
    const response = await request(app)
      .post('/api/v1/login/sign-in')
      .send({
        email: 'adm@mail.com',
        password: 'teste'
      })

    adminAccountToken = response.body.accessToken
  })
  afterAll(async () => await MongoHelperConnection.disconnect())
  afterEach(async () => {
    const collection = await MongoHelperConnection
      .getCollection('surveys')
    await collection.deleteMany({})
  })

  describe('Add Survey', () => {
    it('should return 403 if no access token is provided', async () => {
      await request(app)
        .post('/api/v1/survey')
        .send(makeFakeSurvey())
        .expect(403)
    })
  })
})
