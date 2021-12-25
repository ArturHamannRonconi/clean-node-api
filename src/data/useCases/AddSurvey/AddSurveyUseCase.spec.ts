import { AddSurveyRequestDTO } from '../../../domain/useCases/AddSurveyUseCase'
import { Survey } from '../../../domain/models'
import { DbAddSurveyUseCase } from './DbAddSurveyUseCase'
import { AddSurveyRepository, AddSurveyRepositoryRequestDTO } from '../../protocols/repositories/SurveyRepository'

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (survey: AddSurveyRepositoryRequestDTO): Promise<Survey> {
      return await new Promise(
        resolve => resolve({
          ...makeFakeSurvey(),
          id: 'any_id',
          ownerId: 'any_account_id'
        })
      )
    }
  }

  return new AddSurveyRepositoryStub()
}

const makeFakeSurvey = (): AddSurveyRequestDTO => ({
  accountId: 'any_id',
  role: 0,
  question: 'any_question?',
  answers: [
    { answer: 'any_answer', image: 'any_image' }
  ]
})

interface SutTypes {
  sut: DbAddSurveyUseCase
  addSurveyRepository: AddSurveyRepository
}

const makeSUT = (): SutTypes => {
  const addSurveyRepository = makeAddSurveyRepository()
  const sut = new DbAddSurveyUseCase(
    addSurveyRepository
  )
  return {
    sut,
    addSurveyRepository
  }
}

describe('Add Survey Use Case', () => {
  it('Should be to call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepository } = makeSUT()
    const addSpy = jest.spyOn(addSurveyRepository, 'add')
    const { role, accountId: ownerId, ...addSurveyRepoDTO } = makeFakeSurvey()

    await sut.add({ role, accountId: ownerId, ...addSurveyRepoDTO })
    expect(addSpy).toHaveBeenCalledWith({
      ownerId,
      ...addSurveyRepoDTO
    })
  })

  it('Should be able throws if AddSurveyUseCase throws', async () => {
    const { sut, addSurveyRepository } = makeSUT()
    jest
      .spyOn(addSurveyRepository, 'add')
      .mockImplementationOnce(
        async () => { throw new Error() }
      )

    const error = sut.add(makeFakeSurvey())
    await expect(error).rejects.toThrow()
  })
})
