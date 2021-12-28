import { AddSurveyResultController } from '.'
import { Survey } from '../../../../domain/models'
import { LoadSurveyByIdRequestDTO, LoadSurveyByIdResponseDTO, LoadSurveyByIdUseCase } from '../../../../domain/useCases/LoadSurveyByIdUseCase'
import { HttpRequest, StatusCode } from '../../../protocols/http'
import { AddSurveyResultHttpRequestBody } from './AddSurveyResultHttpRequestBody'
import { AccessDeniedError } from '../../../utils/errors'

const makeFakeSurvey = (): Survey => ({
  id: 'any_survey_id',
  ownerId: 'any_owner_id',
  question: 'any_question',
  answers: [
    { answer: 'any_answer' }
  ]
})

const makeFakeHttpRequest = (): HttpRequest<AddSurveyResultHttpRequestBody> => ({
  params: { survey_id: 'any_survey_id' }
})

const makeloadSurveyByIdUseCase = (): LoadSurveyByIdUseCase => {
  class LoadSurveyByIdUseCaseStub implements LoadSurveyByIdUseCase {
    async load (surveyBox: LoadSurveyByIdRequestDTO): Promise<LoadSurveyByIdResponseDTO> {
      return await new Promise(
        resolve => resolve({ survey: makeFakeSurvey() })
      )
    }
  }

  return new LoadSurveyByIdUseCaseStub()
}

interface SutTypes {
  sut: AddSurveyResultController
  loadSurveyByIdUseCase: LoadSurveyByIdUseCase
}

const makeSUT = (): SutTypes => {
  const loadSurveyByIdUseCase = makeloadSurveyByIdUseCase()
  const sut = new AddSurveyResultController(
    loadSurveyByIdUseCase
  )

  return {
    sut,
    loadSurveyByIdUseCase
  }
}

describe('Add Survey Result Controller', () => {
  it('Should call LoadSurveyByIdUseCase with correct values', async () => {
    const { sut, loadSurveyByIdUseCase } = makeSUT()
    const loadSpy = jest.spyOn(loadSurveyByIdUseCase, 'load')

    await sut.handle(makeFakeHttpRequest())
    expect(loadSpy).toHaveBeenCalledWith({
      surveyId: makeFakeHttpRequest().params.survey_id
    })
  })

  it('Should return 403 if LoadSurveyByIdUseCase return null', async () => {
    const { sut, loadSurveyByIdUseCase } = makeSUT()
    jest
      .spyOn(loadSurveyByIdUseCase, 'load')
      .mockReturnValueOnce(
        new Promise(resolve => resolve(null))
      )

    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toHaveProperty('statusCode', StatusCode.FORBIDDEN)
    expect(httpResponse.body).toHaveProperty('error', new AccessDeniedError().message)
  })
})
