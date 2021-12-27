import request from 'supertest'

import { app } from '../../app'
import { MongoHelperConnection } from '../../../infra/repositories/database/mongodb/helpers/MongoHelperConnection'
import { AddAccountRequestDTO } from '../../../domain/useCases/AddAccountUseCase'
import { Role } from '../../../domain/protocols/Role'

const { MONGO_URL } = process.env

const makeFakeSurvey = (): any => ({
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

  describe('Add Survey', () => {
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
      const surveysCollection = await MongoHelperConnection
        .getCollection('surveys')
      const accountsCollection = await MongoHelperConnection
        .getCollection('accounts')
      await surveysCollection.deleteMany({})
      await accountsCollection.deleteMany({})
    })

    it('should return 201 on success', async () => {
      await request(app)
        .post('/api/v1/survey')
        .set('authorization', `Bearer ${adminAccountToken}`)
        .send(makeFakeSurvey())
        .expect(201)
    })

    it('should return 403 if no access token is provided', async () => {
      await request(app)
        .post('/api/v1/survey')
        .send(makeFakeSurvey())
        .expect(403)
    })
  })

  describe('Load all surveys', () => {
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
      const surveysCollection = await MongoHelperConnection
        .getCollection('surveys')
      const accountsCollection = await MongoHelperConnection
        .getCollection('accounts')
      await surveysCollection.deleteMany({})
      await accountsCollection.deleteMany({})
    })

    it('Should return 200 on success', async () => {
      await Promise.all([
        request(app)
          .post('/api/v1/survey')
          .set(
            'authorization',
            `Bearer ${adminAccountToken}`
          )
          .send(makeFakeSurvey()),
        request(app)
          .post('/api/v1/survey')
          .set(
            'authorization',
            `Bearer ${adminAccountToken}`
          )
          .send(makeFakeSurvey())
      ])

      const response = await request(app)
        .get('/api/v1/survey')
        .set('authorization', `Bearer ${adminAccountToken}`)
        .expect(200)

      expect(response.body.surveys).toHaveLength(2)
      expect(response.body).toHaveProperty('surveys')
    })

    it('Should return 403 if no access token is provided', async () => {
      await request(app)
        .get('/api/v1/survey')
        .expect(403)
    })
  })
})
