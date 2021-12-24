import jwt from 'jsonwebtoken'
import { AuthenticateJWTAdapter } from './AuthenticateJWTAdapter'

interface SutTypes {
  sut: AuthenticateJWTAdapter
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
  verify: () => ({ sub: 'any_id' }),
  sign: () => 'any_token'
}))

describe('Authenticate JWT Adapter', () => {
  describe('auth()', () => {
    it('Should be able to call jwt sign with correct values', async () => {
      const { sut, secret, expiresIn } = makeSUT()
      const signSpy = jest.spyOn(jwt, 'sign')
      const id = 'any_id'

      await sut.auth(id)
      expect(signSpy).toHaveBeenCalledWith(
        { accountId: id }, secret,
        { subject: id, expiresIn }
      )
    })

    it('Should return a token on sign success', async () => {
      const { sut } = makeSUT()
      const id = 'any_id'
      const tokens = await sut.auth(id)

      expect(tokens).toEqual('any_token')
    })

    it('Should throws if sign throws', async () => {
      const { sut } = makeSUT()
      jest.spyOn(jwt, 'sign')
        .mockImplementationOnce(() => { throw new Error() })

      const id = 'any_id'
      const error = sut.auth(id)

      await expect(error).rejects.toThrow()
    })
  })

  describe('readAccessToken()', () => {
    it('Should call verify with correct valus', async () => {
      const { sut, secret } = makeSUT()
      const verifySpy = jest.spyOn(jwt, 'verify')

      await sut.readAccessToken('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', secret)
    })
  })
})
