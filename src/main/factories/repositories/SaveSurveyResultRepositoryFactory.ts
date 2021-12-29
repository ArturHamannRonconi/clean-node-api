import { SurveyResultMongoRepository } from '../../../infra/repositories/database/mongodb/SurveyResultRepository/SurveyResultMongoRepository'

const surveyResultRepositoryFactory = (): SurveyResultMongoRepository => new SurveyResultMongoRepository()

export { surveyResultRepositoryFactory }
