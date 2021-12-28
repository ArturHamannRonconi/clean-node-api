import { AddSurveyRepositoryRequestDTO } from '../../../../../data/protocols/repositories/SurveyRepository'
import { MongoHelperConnection } from '../helpers/MongoHelperConnection'
import { SurveyMongoRepository } from './SurveyMongoRepository'

const { MONGO_URL } = process.env
const sut = (): SurveyMongoRepository => new SurveyMongoRepository()
const makeFakeSurvey = (): AddSurveyRepositoryRequestDTO => ({
  ownerId: 'any_id',
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

  it('Should be able to find all surveys', async () => {
    await Promise.all([
      sut().add(makeFakeSurvey()),
      sut().add(makeFakeSurvey())
    ])

    const surveys = await sut().all()
    expect(surveys).toHaveLength(2)
  })

  it('Should be able to find survey by id', async () => {
    await sut().add(makeFakeSurvey())

    const surveys = await sut().all()
    const surveyId = surveys.reduce(
      (acc, survey) => acc = `${survey.id}`, ''
    )

    const survey = await sut().byId(surveyId)
    expect(survey).toHaveProperty('answers', makeFakeSurvey().answers)
    expect(survey).toHaveProperty('question', makeFakeSurvey().question)
    expect(survey).toHaveProperty('ownerId', makeFakeSurvey().ownerId)
  })
})
