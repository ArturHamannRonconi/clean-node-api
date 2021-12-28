import { Guid } from '../../../domain/protocols/Guid'
import { SaveSurveyResultUseCase } from '../../../domain/useCases/SaveSurveyResultUseCase'
import { SaveSurveyResultRepository } from '../../protocols/repositories/SurveyResultRepository/SaveSurveyResultRepository'
import { SaveSurveuResultRepositoryRequestDTO } from '../../protocols/repositories/SurveyResultRepository/SaveSurveyResultRepositoryRequestDTO'
import { DbSaveSurveyResultUseCase } from './DbSaveSurveyResultUseCase'

const makeFakeSurveyResult = (): SaveSurveuResultRepositoryRequestDTO => ({
  accountId: 'any_account_id',
  answer: 'any_answer',
  surveyId: 'any_survey_id'
})

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (surveyResult: SaveSurveuResultRepositoryRequestDTO): Promise<Guid> {
      return await new Promise(resolve => resolve('any_id'))
    }
  }

  return new SaveSurveyResultRepositoryStub()
}

interface SutTypes {
  sut: SaveSurveyResultUseCase
  saveSurveyResultRepository: SaveSurveyResultRepository
}

const makeSUT = (): SutTypes => {
  const saveSurveyResultRepository = makeSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResultUseCase(
    saveSurveyResultRepository
  )

  return {
    sut,
    saveSurveyResultRepository
  }
}

describe('Db Save Survey Result Use Case', () => {
  it('Should to call SaveSurveyResultRepository', async () => {
    const { sut, saveSurveyResultRepository } = makeSUT()
    const saveSpy = jest.spyOn(saveSurveyResultRepository, 'save')

    await sut.save(makeFakeSurveyResult())
    expect(saveSpy).toHaveBeenCalledWith(makeFakeSurveyResult())
  })

  it('Should throws if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepository } = makeSUT()
    jest
      .spyOn(saveSurveyResultRepository, 'save')
      .mockImplementationOnce(async () => { throw new Error() })

    const error = sut.save(makeFakeSurveyResult())
    await expect(error).rejects.toThrow()
  })

  it('Should return null if SaveSurveyResultRepository return null', async () => {
    const { sut, saveSurveyResultRepository } = makeSUT()
    jest
      .spyOn(saveSurveyResultRepository, 'save')
      .mockReturnValueOnce(new Promise(
        resolve => resolve(null)
      ))

    const nullable = await sut.save(makeFakeSurveyResult())
    expect(nullable).toBeNull()
  })

  it('Should return a Guid if SaveSurveyResultRepository return a Guid', async () => {
    const { sut } = makeSUT()

    const guid = await sut.save(makeFakeSurveyResult())
    expect(guid).toHaveProperty('surveyResultId', 'any_id')
  })
})
