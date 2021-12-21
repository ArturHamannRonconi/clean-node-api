import { Router } from 'express'

import { SignUpControllerExpressdapter } from '../../../infra/router/express/SignUpControllerExpressAdapter'

const loginRoutes = Router()

loginRoutes.post('/sign-up', SignUpControllerExpressdapter.handle)

export { loginRoutes }
