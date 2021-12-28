import { Survey } from '../../../domain/models'
import { LoadSurveyByIdUseCase } from '../../../domain/useCases/LoadSurveyByIdUseCase'
import { FindSurveyRepository } from '../../protocols/repositories/SurveyRepository/FindSurveyRepository'
import { DbLoadSurveyByIdUseCase } from '../LoadSurveyById/DbLoadSurveyByIdUseCase'

const makeFakeSurvey = (): Survey => ({
  id: 'any_id',
  ownerId: 'any_onwer_id',
  question: 'any_question',
  answers: [
    { answer: 'any_answer' }
  ]
})

const makeFindSurveyRepository = (): FindSurveyRepository => {
  class FindSurveyRepositoryStub implements FindSurveyRepository {
    async byId (): Promise<Survey> {
      return await new Promise(
        resolve => resolve(makeFakeSurvey())
      )
    }

    all: () => Promise<Survey[]>
  }

  return new FindSurveyRepositoryStub()
}

interface SutTypes {
  sut: LoadSurveyByIdUseCase
  findSurveyRepository: FindSurveyRepository
}

const makeSUT = (): SutTypes => {
  const findSurveyRepository = makeFindSurveyRepository()
  const sut = new DbLoadSurveyByIdUseCase(
    findSurveyRepository
  )

  return {
    sut,
    findSurveyRepository
  }
}

describe('Db Load By Id Use Case', () => {
  it('Should calls a FindSurveyRepository with correct values', async () => {
    const { sut, findSurveyRepository } = makeSUT()
    const allSpy = jest.spyOn(findSurveyRepository, 'byId')
    const surveyId = 'any_id'

    await sut.load({ surveyId })
    expect(allSpy).toHaveBeenCalledWith(surveyId)
  })
})
