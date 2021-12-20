import jwt from 'jsonwebtoken'
import { AuthenticateJWTAdapter } from './AuthenticateJWTAdapter'

const { JWT_SECRET } = process.env

jest.mock('jsonwebtoken', () => ({
  verify: () => true,
  sign: () => 'any_token'
}))

describe('Authenticate JWT Adapter', () => {
  it('Should be able to call jwt sign with correct values', async () => {
    const sut = new AuthenticateJWTAdapter()
    const signSpy = jest.spyOn(jwt, 'sign')
    const id = 'any_id'

    await sut.auth(id)
    expect(signSpy).toHaveBeenCalledWith(
      { userId: id },
      JWT_SECRET,
      { subject: id, expiresIn: '15m' }
    )
  })
})
