import { Router } from 'express'

const signUpRoutes = Router()

signUpRoutes.post('/sign-up', (req, res) => res.status(201).json({ ok: 'ok' }))

export { signUpRoutes }
