import { Survey } from '../../../../domain/models'
import { AddSurveyRepositoryRequestDTO } from '.'

interface AddSurveyRepository {
  add: (survey: AddSurveyRepositoryRequestDTO) => Promise<Survey>
}

export { AddSurveyRepository }
