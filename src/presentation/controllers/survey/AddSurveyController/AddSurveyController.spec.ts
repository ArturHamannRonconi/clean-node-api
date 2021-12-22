import { Validation } from '../../../protocols/validators'
import { HttpRequest, Json, StatusCode } from '../../../protocols/http'
import { AddSurveyController } from '.'
import { AddSurveyHttpRequestBody } from './AddSurveyHttpRequestBody'

const makeFakeHttpRequest = (): HttpRequest<AddSurveyHttpRequestBody> => ({
  body: {
    question: 'any_question',
    answers: [
      { image: 'any_image', answer: 'any_answer' }
    ]
  }
})

const validationStub = (): Validation => {
  class ValidationStub implements Validation {
    async validate (body: Json): Promise<Error> {
      return await new Promise(resolve => resolve(null))
    }
  }

  return new ValidationStub()
}

interface SutTypes {
  sut: AddSurveyController
  validation: Validation
}

const makeSUT = (): SutTypes => {
  const validation = validationStub()
  const sut = new AddSurveyController(
    validation
  )

  return { sut, validation }
}

describe('Add Survery Controller', () => {
  it('Should call validation with correct values', async () => {
    const { sut, validation } = makeSUT()
    const validateSpy = jest.spyOn(validation, 'validate')

    const httpRequest = makeFakeHttpRequest()
    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('Should returns 400 if returns an error', async () => {
    const { sut, validation } = makeSUT()
    const response = new Error()

    jest
      .spyOn(validation, 'validate')
      .mockReturnValueOnce(
        new Promise(resolve => resolve(response))
      )
    const httpRequest = {
      body: {
        question: 'any_question',
        answers: undefined
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toHaveProperty('statusCode', StatusCode.BAD_REQUEST)
    expect(httpResponse).toHaveProperty('body', response)
  })
})
