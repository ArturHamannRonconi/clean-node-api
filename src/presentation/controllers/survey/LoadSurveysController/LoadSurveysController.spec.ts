import { LoadSurveysController } from '.'
import { Survey } from '../../../../domain/models'
import { LoadSurveysResponseDTO, LoadSurveysUseCase } from '../../../../domain/useCases/LoadSurveysUseCase'

const makeFakeSurvey = (): Survey => ({
  id: 'any_id',
  ownerId: 'any_owner_id',
  question: 'any_question?',
  answers: [
    { answer: 'any_answer' },
    { answer: 'any_answer_2', image: 'any_image' }
  ]
})

const makeLoadSurveysUseCase = (): LoadSurveysUseCase => {
  class LoadSurveysUseCaseStub implements LoadSurveysUseCase {
    async load (): Promise<LoadSurveysResponseDTO> {
      return await new Promise(
        resolve => resolve({ surveys: [makeFakeSurvey()] })
      )
    }
  }

  return new LoadSurveysUseCaseStub()
}

interface SutTypes {
  sut: LoadSurveysController
  loadSurveysUseCase: LoadSurveysUseCase
}

const makeSUT = (): SutTypes => {
  const loadSurveysUseCase = makeLoadSurveysUseCase()
  const sut = new LoadSurveysController(
    loadSurveysUseCase
  )

  return {
    sut,
    loadSurveysUseCase
  }
}

describe('Load Surveys Controller', () => {
  it('Should call LoadSurveysUseCase', async () => {
    const { sut, loadSurveysUseCase } = makeSUT()
    const loadSpy = jest.spyOn(loadSurveysUseCase, 'load')

    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
