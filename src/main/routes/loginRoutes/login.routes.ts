import { Router } from 'express'
import { SignInControllerExpressAdapter } from '../../../infra/router/express/SignInControllerExpressAdapter'

import { SignUpControllerExpressdapter } from '../../../infra/router/express/SignUpControllerExpressAdapter'

const loginRoutes = Router()

loginRoutes.post('/sign-up', SignUpControllerExpressdapter.handle)
loginRoutes.post('/sign-in', SignInControllerExpressAdapter.handle)

export { loginRoutes }
