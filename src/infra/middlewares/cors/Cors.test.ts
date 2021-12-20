import request from 'supertest'
import { app } from '../../../main/app'

const route = '/test_cors'

describe('Cors Middleware', () => {
  it('Should enable cors', async () => {
    app.post(route, (req, res) => res.json({ a: 'a' }))

    await request(app)
      .post(route)
      .expect('access-control-allow-origin', '*')
  })
})
