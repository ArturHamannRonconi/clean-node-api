import jwt from 'jsonwebtoken'
import { Authenticate } from '../../data/protocols'
import { AuthenticateJWTAdapter } from './AuthenticateJWTAdapter'

interface SutTypes {
  sut: Authenticate
  secret: string
  expiresIn: string | number
}

const makeSUT = (): SutTypes => {
  const secret = 'JWT_SECRET'
  const expiresIn = '15m'
  const sut = new AuthenticateJWTAdapter(
    secret, expiresIn
  )

  return {
    sut,
    secret,
    expiresIn
  }
}

jest.mock('jsonwebtoken', () => ({
  verify: () => true,
  sign: () => 'any_token'
}))

describe('Authenticate JWT Adapter', () => {
  it('Should be able to call jwt sign with correct values', async () => {
    const { sut, secret, expiresIn } = makeSUT()
    const signSpy = jest.spyOn(jwt, 'sign')
    const id = 'any_id'

    await sut.auth(id)
    expect(signSpy).toHaveBeenCalledWith(
      { userId: id }, secret,
      { subject: id, expiresIn }
    )
  })
})
