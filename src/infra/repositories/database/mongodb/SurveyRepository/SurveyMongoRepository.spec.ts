import { AddSurveyRequestDTO } from '../../../../../domain/useCases/AddSurveyUseCase'
import { MongoHelperConnection } from '../helpers/MongoHelperConnection'
import { SurveyMongoRepository } from './SurveyMongoRepository'

const { MONGO_URL } = process.env
const sut = (): SurveyMongoRepository => new SurveyMongoRepository()
const makeFakeSurvey = (): AddSurveyRequestDTO => ({
  question: 'any_question?',
  answers: [
    { answer: 'any_answer', image: 'any_image' }
  ]
})

describe('Survey Mongo Repository', () => {
  beforeAll(async () => await MongoHelperConnection.connect(MONGO_URL))
  afterAll(async () => await MongoHelperConnection.disconnect())
  afterEach(async () => await (await MongoHelperConnection
    .getCollection('surveys'))
    .deleteMany({})
  )

  it('Should be able to create a new survey and return it', async () => {
    const survey = await sut().add(makeFakeSurvey())
    expect(survey).toHaveProperty('id')
  })
})
