import request from 'supertest'

import { app } from '../../app'
import { MongoHelperConnection } from '../../../infra/repositories/database/mongodb/helpers/MongoHelperConnection'
import { AddSurveyRequestDTO } from '../../../domain/useCases/AddSurveyUseCase'

const { MONGO_URL } = process.env

const makeFakeSurvey = (): AddSurveyRequestDTO => ({
  question: 'any_question?',
  answers: [
    { answer: 'any_answer', image: 'any_image' }
  ]
})

describe('survey routes', () => {
  beforeAll(async () => await MongoHelperConnection.connect(MONGO_URL))
  afterAll(async () => await MongoHelperConnection.disconnect())
  afterEach(async () => {
    const collection = await MongoHelperConnection
      .getCollection('surveys')
    await collection.deleteMany({})
  })

  describe('Add Survey', () => {
    it('should return 201 on success', async () => {
      await request(app)
        .post('/api/v1/survey')
        .send(makeFakeSurvey())
        .expect(201)
    })
  })
})
