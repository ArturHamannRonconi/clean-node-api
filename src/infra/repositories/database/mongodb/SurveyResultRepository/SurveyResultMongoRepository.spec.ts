import { SaveSurveuResultRepositoryRequestDTO } from '../../../../../data/protocols/repositories/SurveyResultRepository/SaveSurveyResultRepositoryRequestDTO'
import { SurveyResultMongoRepository } from './SurveyResultMongoRepository'
import { MongoHelperConnection } from '../helpers/MongoHelperConnection'

const { MONGO_URL } = process.env

const makeFakeSurveyResult = (): SaveSurveuResultRepositoryRequestDTO => ({
  accountId: 'any_account_id',
  answer: 'any_answer',
  surveyId: 'any_survey_id'
})

interface SutTypes {
  sut: SurveyResultMongoRepository
}

const makeSUT = (): SutTypes => {
  const sut = new SurveyResultMongoRepository()
  return {
    sut
  }
}

describe('Survey Result Repository', () => {
  beforeAll(async () => await MongoHelperConnection.connect(MONGO_URL))
  afterAll(async () => await MongoHelperConnection.disconnect())
  afterEach(async () => await (await MongoHelperConnection
    .getCollection('surveysResults'))
    .deleteMany({})
  )

  it('Should insert if SurveyResult not exists', async () => {
    const { sut } = makeSUT()
    const guid = await sut.save(makeFakeSurveyResult())
    expect(guid).toBeTruthy()
  })
})
