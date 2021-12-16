import { Collection, MongoClient } from 'mongodb'

class MongoHelperConnection {
  private static client: MongoClient

  static async connect (url: string): Promise<void> {
    if (this.client !== null)
      this.client = await MongoClient.connect(url)
  }

  static async disconnect (): Promise<void> {
    if (this.client !== null) {
      await this.client.close()
      this.client = null
    }
  }

  static getCollection (collectionName: string): Collection {
    let collection = this.client.db()
      .collection(collectionName)

    if (this.client === null)
      this.client
        .connect()
        .then(con => {
          collection = con.db()
            .collection(collectionName)
        })
        .catch(console.error)

    return collection
  }
}

export { MongoHelperConnection }
