import { Encrypter } from '../../data/protocols'
import { hash } from 'bcryptjs'

class BcryptEncryptAdapter implements Encrypter {
  constructor (
    private readonly salt: number
  ) { }

  async encrypt (value: string): Promise<string> {
    await hash(value, this.salt)
    return null
  }
}

export { BcryptEncryptAdapter }
