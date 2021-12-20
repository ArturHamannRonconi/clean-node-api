import { ObjectId } from 'mongodb'
import { UpdateTokenRepository } from '../../../../data/protocols'
import { Guid } from '../../../../domain/protocols/Guid'
import { MongoHelperConnection } from '../helpers/MongoHelperConnection'

class TokenMongoRepository implements UpdateTokenRepository {
  async byId (id: Guid, token: string): Promise<void> {
    const tokensCollection = await MongoHelperConnection
      .getCollection('tokens')

    await tokensCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { accessToken: token } }
    )
  }
}

export { TokenMongoRepository }
