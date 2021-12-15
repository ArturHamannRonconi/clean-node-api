import { MongoClient } from 'mongodb'

const mongoHelperConnection = {
  client: null as MongoClient,

  async connect (): Promise<void> {
    if (this.client !== null)
      this.client = MongoClient.connect(process.env.MONGO_URL)
  },

  async disconnect (): Promise<void> {
    if (this.client !== null)
      this.client.close()
  }
}

export { mongoHelperConnection }
