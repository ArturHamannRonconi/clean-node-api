import { AddSurveyUseCase } from '../../../../domain/useCases/AddSurveyUseCase'
import { Controller } from '../../../protocols'
import { HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validators'
import { AccessDeniedError } from '../../../utils/errors'
import { badRequest, created, serverError } from '../../../utils/http'
import { forbidden } from '../../../utils/http/forbidden'
import { AddSurveyRequest } from './AddSurveyRequest'

class AddSurveyController implements Controller<AddSurveyRequest> {
  constructor (
    private readonly validation: Validation,
    private readonly addSurveyUseCase: AddSurveyUseCase
  ) {}

  async handle (request: AddSurveyRequest): Promise<HttpResponse> {
    try {
      const { answers, question, accountId, role } = request

      const error = await this.validation.validate(request)
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
