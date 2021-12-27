import { LoadSurveysUseCase } from '../../../../domain/useCases/LoadSurveysUseCase'
import { Controller } from '../../../protocols'
import { HttpRequest, HttpResponse } from '../../../protocols/http'

class LoadSurveysController implements Controller<void> {
  constructor (
    private readonly loadSurveysUseCase: LoadSurveysUseCase
  ) {}

  async handle (httpRequest: HttpRequest<void>): Promise<HttpResponse> {
    await this.loadSurveysUseCase.load()
    return null
  }
}

export { LoadSurveysController }
