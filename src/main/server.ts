import '../config/enviroment'
import { app } from './app'

const { PORT } = process.env

app.listen(PORT,
  () => console.log(`Server is running, http://localhost:${PORT}`)
)
