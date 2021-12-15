import '../../config/enviroment'
import bcryptjs from 'bcryptjs'

import { BcryptEncryptAdapter } from './BcryptEncrypterAdapter'

const { SALT } = process.env
const makeSUT = (): BcryptEncryptAdapter => new BcryptEncryptAdapter()

describe('Bcrypt Encrypter Adapter', () => {
  it('Should call bcrypt witth correct value', async () => {
    const hashSpy = jest.spyOn(bcryptjs, 'hash')
    const sut = makeSUT()
    const password = 'any_password'

    await sut.encrypt(password)
    expect(hashSpy).toHaveBeenCalledWith(password, Number(SALT))
  })
})
