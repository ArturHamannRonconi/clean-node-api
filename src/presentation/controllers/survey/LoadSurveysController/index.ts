import { LoadSurveysUseCase } from '../../../../domain/useCases/LoadSurveysUseCase'
import { Controller } from '../../../protocols'
import { HttpResponse } from '../../../protocols/http'
import { serverError, success } from '../../../utils/http'
import { noContent } from '../../../utils/http/noContent'

class LoadSurveysController implements Controller<void> {
  constructor (
    private readonly loadSurveysUseCase: LoadSurveysUseCase
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const surveysBox = await this.loadSurveysUseCase.load()

      return surveysBox.surveys.length
        ? success(surveysBox)
        : noContent()
    } catch (error) {
      return serverError(error.message)
    }
  }
}

export { LoadSurveysController }
