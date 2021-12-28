import { Guid } from '../../../../domain/protocols/Guid'
import { SaveSurveuResultRepositoryRequestDTO } from './SaveSurveyResultRepositoryRequestDTO'

interface SaveSurveyResultRepository {
  save: (surveyResult: SaveSurveuResultRepositoryRequestDTO) => Promise<Guid>
}

export { SaveSurveyResultRepository }
