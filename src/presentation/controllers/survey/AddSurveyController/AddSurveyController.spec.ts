import { AddSurveyController } from '.'
import { MissingParamError, ServerError } from '../../../utils/errors'
import { Validation } from '../../../protocols/validators'
import { AddSurveyRequest } from './AddSurveyRequest'
import { Json, StatusCode } from '../../../protocols/http'
import { AddSurveyRequestDTO, AddSurveyUseCase } from '../../../../domain/useCases/AddSurveyUseCase'
import { Role } from '../../../../domain/protocols/Role'

const makeFakeHttpRequest = (): AddSurveyRequest => ({
  role: Role.ADMIN,
  accountId: 'any_id',
  question: 'any_question',
  answers: [
    { image: 'any_image', answer: 'any_answer' }
  ]
})

const validationStub = (): Validation => {
  class ValidationStub implements Validation {
    async validate (body: Json): Promise<Error> {
      return await new Promise(resolve => resolve(null))
    }
  }

  return new ValidationStub()
}

const addSurveyUseCaseStub = (): AddSurveyUseCase => {
  class AddSurveyUseCaseStub implements AddSurveyUseCase {
    async add (survey: AddSurveyRequestDTO): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }

  return new AddSurveyUseCaseStub()
}

interface SutTypes {
  sut: AddSurveyController
  validation: Validation
  addSurveyUseCase: AddSurveyUseCase
}

const makeSUT = (): SutTypes => {
  const validation = validationStub()
  const addSurveyUseCase = addSurveyUseCaseStub()

  const sut = new AddSurveyController(
    validation,
    addSurveyUseCase
  )

  return {
    sut,
    validation,
    addSurveyUseCase
  }
}

describe('Add Survery Controller', () => {
  it('Should call validation with correct values', async () => {
    const { sut, validation } = makeSUT()
    const validateSpy = jest.spyOn(validation, 'validate')

    await sut.handle(makeFakeHttpRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeHttpRequest())
  })

  it('Should returns 400 if returns an error', async () => {
    const { sut, validation } = makeSUT()
    const response = new MissingParamError('answers')

    jest
      .spyOn(validation, 'validate')
      .mockReturnValueOnce(
        new Promise(resolve => resolve(response))
      )
    const request = {
      question: 'any_question',
      answers: undefined,
      accountId: undefined,
      role: undefined
    }

    const httpResponse = await sut.handle(request)
    expect(httpResponse).toHaveProperty('statusCode', StatusCode.BAD_REQUEST)
    expect(httpResponse.body).toHaveProperty('error', response.message)
  })

  it('Should returns 500 if validation throws', async () => {
    const { sut, validation } = makeSUT()
    const response = new Error('any_message')
    jest
      .spyOn(validation, 'validate')
      .mockImplementation(async () => { throw response })

    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toHaveProperty('statusCode', StatusCode.INTERNAL_SERVER)
    expect(httpResponse).toHaveProperty('body', new ServerError())
    expect(httpResponse).toHaveProperty('description', response.message)
  })

  it('Should call addSurvey with correct values', async () => {
    const { sut, addSurveyUseCase } = makeSUT()
    const addSpy = jest.spyOn(addSurveyUseCase, 'add')
    const request = makeFakeHttpRequest()

    await sut.handle(request)
    expect(addSpy).toHaveBeenCalledWith(request)
  })

  it('Should returns 500 if addSurvey throws', async () => {
    const { sut, addSurveyUseCase } = makeSUT()
    const response = new Error('any_message')
    jest
      .spyOn(addSurveyUseCase, 'add')
      .mockImplementation(async () => { throw response })

    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toHaveProperty('statusCode', StatusCode.INTERNAL_SERVER)
    expect(httpResponse).toHaveProperty('body', new ServerError())
    expect(httpResponse).toHaveProperty('description', response.message)
  })
})
