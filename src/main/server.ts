import '../config/enviroment'
import { app } from './app'
import { MongoHelperConnection } from '../infra/database/mongodb/helpers/MongoHelperConnection'

const { PORT, MONGODB_URL } = process.env

MongoHelperConnection
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(PORT,
      () => console.log(`Server is running, http://localhost:${PORT}`)
    )
  })
  .catch(console.error)
