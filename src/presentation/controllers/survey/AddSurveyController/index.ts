import { AddSurveyUseCase } from '../../../../domain/useCases/AddSurveyUseCase'
import { Controller } from '../../../protocols'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validators'
import { AccessDeniedError } from '../../../utils/errors'
import { badRequest, created, serverError } from '../../../utils/http'
import { forbidden } from '../../../utils/http/forbidden'
import { AddSurveyHttpRequestBody } from './AddSurveyHttpRequestBody'

class AddSurveyController implements Controller<AddSurveyHttpRequestBody> {
  constructor (
    private readonly validation: Validation,
    private readonly addSurveyUseCase: AddSurveyUseCase
  ) {}

  async handle (httpRequest: HttpRequest<AddSurveyHttpRequestBody>): Promise<HttpResponse> {
    try {
      const { answers, question, accountId, role } = httpRequest.body

      const error = await this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const newSurveyHasAdded = await this.addSurveyUseCase.add({
        answers, question, accountId, role
      })

      if (!newSurveyHasAdded)
        return forbidden(new AccessDeniedError())

      return created()
    } catch (error) {
      return serverError(error.message)
    }
  }
}

export { AddSurveyController }
