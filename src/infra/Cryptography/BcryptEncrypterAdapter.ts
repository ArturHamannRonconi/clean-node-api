import { Encrypter } from '../../data/protocols'
import { hash } from 'bcryptjs'

class BcryptEncryptAdapter implements Encrypter {
  constructor (
    private readonly salt: number
  ) { }

  async encrypt (value: string): Promise<string> {
    return await hash(value, this.salt)
  }
}

export { BcryptEncryptAdapter }
