import { Encrypter } from '../../data/protocols'
import { hash } from 'bcryptjs'

class BcryptEncryptAdapter implements Encrypter {
  async encrypt (value: string): Promise<string> {
    const { SALT } = process.env

    await hash(value, Number(SALT))
    return null
  }
}

export { BcryptEncryptAdapter }
