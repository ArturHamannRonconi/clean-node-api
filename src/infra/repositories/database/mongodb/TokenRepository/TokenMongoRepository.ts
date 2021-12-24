import { ObjectId } from 'mongodb'
import { UpdateTokenRepository } from '../../../../../data/protocols'
import { Guid } from '../../../../../domain/protocols/Guid'
import { MongoHelperConnection } from '../helpers/MongoHelperConnection'

class TokenMongoRepository implements UpdateTokenRepository {
  async byId (id: Guid, token: string): Promise<void> {
    const tokensCollection = await MongoHelperConnection
      .getCollection('tokens')

    const _id = new ObjectId(id)
    const accessToken = token

    const findedToken = await tokensCollection
      .find(_id)
      .limit(1)
      .count()

    if (findedToken) {
      await tokensCollection.updateOne(
        { _id }, { $set: { accessToken } }
      )
    } else {
      await tokensCollection.insertOne({
        _id, accessToken
      })
    }
  }
}

export { TokenMongoRepository }
