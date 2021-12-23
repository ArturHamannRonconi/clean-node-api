import { AddSurveyRepository } from '../../../../../data/protocols'
import { Survey } from '../../../../../domain/models'
import { AddSurveyRequestDTO } from '../../../../../domain/useCases/AddSurveyUseCase'
import { MongoHelperConnection } from '../helpers/MongoHelperConnection'

class SurveyMongoRepository implements AddSurveyRepository {
  async add (survey: AddSurveyRequestDTO): Promise<Survey> {
    const surveysCollection = await MongoHelperConnection
      .getCollection('surveys')

    const { insertedId } = await surveysCollection.insertOne(survey)

    return {
      ...survey,
      id: insertedId.toString()
    }
  }
}

export { SurveyMongoRepository }
