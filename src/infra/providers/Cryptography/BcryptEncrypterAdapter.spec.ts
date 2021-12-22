import '../../../config/enviroment'
import bcryptjs from 'bcryptjs'

import { BcryptEncryptAdapter } from './BcryptEncrypterAdapter'

const { SALT } = process.env
const makeSUT = (): BcryptEncryptAdapter => new BcryptEncryptAdapter(Number(SALT))

jest.mock('bcryptjs', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('any_hash'))
  }
}))

describe('Bcrypt Encrypter Adapter', () => {
  it('Should call bcrypt witth correct value', async () => {
    const hashSpy = jest.spyOn(bcryptjs, 'hash')
    const sut = makeSUT()
    const password = 'any_password'

    await sut.encrypt(password)
    expect(hashSpy).toHaveBeenCalledWith(password, Number(SALT))
  })

  it('Should return a hash on success', async () => {
    const sut = makeSUT()
    const password = 'any_password'

    const result = await sut.encrypt(password)
    expect(result).toBe('any_hash')
  })

  it('Should throw if bcrypt throws', async () => {
    const sut = makeSUT()
    jest.spyOn(bcryptjs, 'hash')
      .mockImplementation(() => { throw new Error() })

    const result = sut.encrypt('any_password')
    await expect(result).rejects.toThrow()
  })
})
