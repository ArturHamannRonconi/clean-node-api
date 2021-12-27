import { LoadSurveysUseCase } from '../../../../domain/useCases/LoadSurveysUseCase'
import { Controller } from '../../../protocols'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { serverError } from '../../../utils/http'

class LoadSurveysController implements Controller<void> {
  constructor (
    private readonly loadSurveysUseCase: LoadSurveysUseCase
  ) {}

  async handle (httpRequest: HttpRequest<void>): Promise<HttpResponse> {
    try {
      await this.loadSurveysUseCase.load()
      return null
    } catch (error) {
      return serverError(error.message)
    }
  }
}

export { LoadSurveysController }
