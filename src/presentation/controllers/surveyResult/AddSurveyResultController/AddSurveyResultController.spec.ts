import { AddSurveyResultController } from '.'
import { Survey } from '../../../../domain/models'
import { LoadSurveyByIdRequestDTO, LoadSurveyByIdResponseDTO, LoadSurveyByIdUseCase } from '../../../../domain/useCases/LoadSurveyByIdUseCase'
import { StatusCode } from '../../../protocols/http'
import { AddSurveyResultRequest } from './AddSurveyResultRequest'
import { InvalidParamError, ServerError } from '../../../utils/errors'
import { SaveSurveyResultRequestDTO, SaveSurveyResultResponseDTO, SaveSurveyResultUseCase } from '../../../../domain/useCases/SaveSurveyResultUseCase'

const makeFakeSurvey = (): Survey => ({
  id: 'any_survey_id',
  ownerId: 'any_owner_id',
  question: 'any_question',
  answers: [
    { answer: 'any_answer' }
  ]
})

const makeFakeHttpRequest = (): AddSurveyResultRequest => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer'
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

const makeSaveSurveyResultUseCase = (): SaveSurveyResultUseCase => {
  class SaveSurveyResultUseCaseStub implements SaveSurveyResultUseCase {
    async save (surveyResult: SaveSurveyResultRequestDTO): Promise<SaveSurveyResultResponseDTO> {
      return await new Promise(
        resolve => resolve({ surveyResultId: 'any_survey_result' })
      )
    }
  }

  return new SaveSurveyResultUseCaseStub()
}

interface SutTypes {
  sut: AddSurveyResultController
  loadSurveyByIdUseCase: LoadSurveyByIdUseCase
  saveSurveyResultUseCase: SaveSurveyResultUseCase
}

const makeSUT = (): SutTypes => {
  const loadSurveyByIdUseCase = makeloadSurveyByIdUseCase()
  const saveSurveyResultUseCase = makeSaveSurveyResultUseCase()
  const sut = new AddSurveyResultController(
    loadSurveyByIdUseCase,
    saveSurveyResultUseCase
  )

  return {
    sut,
    loadSurveyByIdUseCase,
    saveSurveyResultUseCase
  }
}

describe('Add Survey Result Controller', () => {
  it('Should call LoadSurveyByIdUseCase with correct values', async () => {
    const { sut, loadSurveyByIdUseCase } = makeSUT()
    const loadSpy = jest.spyOn(loadSurveyByIdUseCase, 'load')
    const { surveyId } = makeFakeHttpRequest()

    await sut.handle(makeFakeHttpRequest())
    expect(loadSpy).toHaveBeenCalledWith({ surveyId })
  })

  it('Should return 403 if surveyId not exists', async () => {
    const { sut, loadSurveyByIdUseCase } = makeSUT()
    jest
      .spyOn(loadSurveyByIdUseCase, 'load')
      .mockReturnValueOnce(
        new Promise(resolve => resolve(null))
      )

    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toHaveProperty('statusCode', StatusCode.FORBIDDEN)
    expect(httpResponse.body).toHaveProperty(
      'error', new InvalidParamError('survey_id').message
    )
  })

  it('Should return 403 if answer not exists', async () => {
    const { sut } = makeSUT()

    const httpresponse = await sut.handle({
      ...makeFakeHttpRequest(),
      accountId: 'any_account_id',
      answer: 'answer_not_exists'
    })

    expect(httpresponse).toHaveProperty('statusCode', StatusCode.FORBIDDEN)
    expect(httpresponse.body).toHaveProperty('error', new InvalidParamError('answer').message)
  })

  it('Should return 500 if LoadSurveyByIdUseCase throws', async () => {
    const { sut, loadSurveyByIdUseCase } = makeSUT()

    jest
      .spyOn(loadSurveyByIdUseCase, 'load')
      .mockImplementationOnce(async () => { throw new Error() })

    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toHaveProperty('statusCode', StatusCode.INTERNAL_SERVER)
    expect(httpResponse).toHaveProperty('body', new ServerError())
  })

  it('Should return 500 if SaveSurveyResultUseCase throws', async () => {
    const { sut, saveSurveyResultUseCase } = makeSUT()

    jest
      .spyOn(saveSurveyResultUseCase, 'save')
      .mockImplementationOnce(async () => { throw new Error() })

    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toHaveProperty('statusCode', StatusCode.INTERNAL_SERVER)
    expect(httpResponse).toHaveProperty('body', new ServerError())
  })

  it('Should call SaveSurveyResultUseCase with correct values', async () => {
    const { sut, saveSurveyResultUseCase } = makeSUT()
    const saveSpy = jest.spyOn(saveSurveyResultUseCase, 'save')
    const request = makeFakeHttpRequest()

    await sut.handle(makeFakeHttpRequest())
    expect(saveSpy).toHaveBeenCalledWith(request)
  })
})
