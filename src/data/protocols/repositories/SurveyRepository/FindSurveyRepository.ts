import { Survey } from '../../../../domain/models'

interface FindSurveyRepository {
  all: () => Promise<Survey[]>
}

export { FindSurveyRepository }
