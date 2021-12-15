import request from 'supertest'
import { app } from '../../app'

describe('Sign Up routes', () => {
  it('Should return an account on success', async () => {
    await request(app)
      .post('/api/v1/sign-up')
      .send({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'a44638qewq92!A',
        passwordConfirmation: 'a44638qewq92!A'
      })
      .expect(201)
  })
})
