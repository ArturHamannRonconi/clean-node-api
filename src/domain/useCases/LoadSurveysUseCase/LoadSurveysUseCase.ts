import { LoadSurveysResponseDTO } from './LoadSurveysResponseDTO'

interface LoadSurveysUseCase {
  load: () => Promise<LoadSurveysResponseDTO>
}

export { LoadSurveysUseCase }
