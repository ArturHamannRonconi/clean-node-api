import { SurveyMongoRepository } from '../../../infra/repositories/database/mongodb/SurveyRepository/SurveyMongoRepository'

const surveyRepositoryFactory = (): SurveyMongoRepository => new SurveyMongoRepository()

export { surveyRepositoryFactory }
