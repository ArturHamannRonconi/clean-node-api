import { Survey } from '../../../../domain/models'
import { AddSurveyRequestDTO } from '../../../../domain/useCases/AddSurveyUseCase'

interface AddSurveyRepository {
  add: (survey: AddSurveyRequestDTO) => Promise<Survey>
}

export { AddSurveyRepository }
