import request from 'supertest'
import { app } from '../../app'

const route = '/test_body_parser'

describe('Body Parser Middleware', () => {
  it('Should be able to body parser', async () => {
    app.post(route, (req, res) => res.json(req.body))
    const body = { test: 'test' }
    await request(app)
      .post(route)
      .send(body)
      .expect(body)
  })
})
