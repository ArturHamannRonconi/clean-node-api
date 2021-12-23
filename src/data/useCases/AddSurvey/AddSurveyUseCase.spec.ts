import { AddSurveyRequestDTO } from '../../../domain/useCases/AddSurveyUseCase'
import { Survey } from '../../../domain/models'
import { DbAddSurveyUseCase } from './DbAddSurveyUseCase'
import { AddSurveyRepository } from '../../protocols/repositories/SurveyRepository/AddSurveyRepository'

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (survey: AddSurveyRequestDTO): Promise<Survey> {
      return await new Promise(
        resolve => resolve({ ...makeFakeSurvey(), id: 'any_id' })
      )
    }
  }

  return new AddSurveyRepositoryStub()
}

const makeFakeSurvey = (): AddSurveyRequestDTO => ({
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
    const dto = makeFakeSurvey()

    await sut.add(dto)
    expect(addSpy).toHaveBeenCalledWith(dto)
  })
})
