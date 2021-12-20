import { sign } from 'jsonwebtoken'

import { Authenticate } from '../../data/protocols'
import { Tokens } from '../../data/protocols/Authenticate/Tokens'
import { Guid } from '../../domain/protocols/Guid'

class AuthenticateJWTAdapter implements Authenticate {
  async auth (id: Guid): Promise<Tokens> {
    const userId = id as string

    const accessToken = sign(
      { userId }, process.env.JWT_SECRET,
      { subject: userId, expiresIn: '15m' }
    )

    return { accessToken }
  }
}

export { AuthenticateJWTAdapter }
