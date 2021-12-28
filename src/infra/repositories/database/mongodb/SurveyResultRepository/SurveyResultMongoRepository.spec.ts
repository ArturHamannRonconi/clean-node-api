import { SaveSurveuResultRepositoryRequestDTO } from '../../../../../data/protocols/repositories/SurveyResultRepository/SaveSurveyResultRepositoryRequestDTO'
import { SurveyResultMongoRepository } from './SurveyResultMongoRepository'
import { MongoHelperConnection } from '../helpers/MongoHelperConnection'

const { MONGO_URL } = process.env

const makeFakeSurveyResult = (): SaveSurveuResultRepositoryRequestDTO => ({
  accountId: 'any_account_id',
  answer: 'any_answer',
  surveyId: 'any_survey_id'
})

const sut = (): SurveyResultMongoRepository => new SurveyResultMongoRepository()

describe('Survey Result Repository', () => {
  beforeAll(async () => await MongoHelperConnection.connect(MONGO_URL))
  afterAll(async () => await MongoHelperConnection.disconnect())
  afterEach(async () => await (await MongoHelperConnection
    .getCollection('surveysResults'))
    .deleteMany({})
  )

  it('Should insert if SurveyResult not exists', async () => {
    const guid = await sut().save(makeFakeSurveyResult())
    expect(guid).toBeTruthy()
  })

  it('Should update if SurveyResult already exists', async () => {
    await sut().save(makeFakeSurveyResult())

    const guid = sut().save({
      ...makeFakeSurveyResult(),
      answer: 'any_answer_2'
    })
    expect(guid).toBeTruthy()
  })

  it('Should update if SurveyResult already exists', async () => {
    const guid1 = await sut().save(makeFakeSurveyResult())

    const guid2 = await sut().save({
      ...makeFakeSurveyResult(),
      answer: 'any_answer_2'
    })
    expect(guid2).toBeTruthy()
    expect(guid2).toEqual(guid1)
  })
})
