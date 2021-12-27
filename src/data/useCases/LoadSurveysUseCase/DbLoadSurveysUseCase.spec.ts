import { Survey } from '../../../domain/models'
import { FindSurveyRepository } from '../../protocols/repositories/SurveyRepository/FindSurveyRepository'
import { DbLoadSurveysUseCase } from '../LoadSurveysUseCase/DbLoadSurveysUseCase'

const makeFakeSurvey = (): Survey => ({
  id: 'any_id',
  ownerId: 'any_owner_id',
  question: 'any_question?',
  answers: [
    { answer: 'any_answer', image: 'any_image' }
  ]
})

const makeFindSurveyRepository = (): FindSurveyRepository => {
  class FindSurveyRepositoryStub implements FindSurveyRepository {
    async all (): Promise<Survey[]> {
      return await new Promise(
        resolve => resolve([makeFakeSurvey()])
      )
    }
  }

  return new FindSurveyRepositoryStub()
}

interface SutTypes {
  sut: DbLoadSurveysUseCase
  findSurveyRepository: FindSurveyRepository
}

const makeSUT = (): SutTypes => {
  const findSurveyRepository = makeFindSurveyRepository()
  const sut = new DbLoadSurveysUseCase(
    findSurveyRepository
  )

  return {
    sut,
    findSurveyRepository
  }
}

describe('Db Load Survey Use Case', () => {
  it('Should calls FindSurveyRepository', async () => {
    const { sut, findSurveyRepository } = makeSUT()
    const allSpy = jest.spyOn(findSurveyRepository, 'all')

    await sut.load()
    expect(allSpy).toHaveBeenCalled()
  })

  it('Should be throws if FindSurveyRepository trows', async () => {
    const { sut, findSurveyRepository } = makeSUT()
    jest
      .spyOn(findSurveyRepository, 'all')
      .mockImplementationOnce(async () => { throw new Error() })

    const error = sut.load()
    await expect(error).rejects.toThrow()
  })
})
