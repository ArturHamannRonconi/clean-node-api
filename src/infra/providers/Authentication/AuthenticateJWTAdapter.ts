import { sign } from 'jsonwebtoken'

import { Authenticate } from '../../../data/protocols'
import { Guid } from '../../../domain/protocols/Guid'

class AuthenticateJWTAdapter implements Authenticate {
  constructor (
    private readonly JWT_SECRET: string,
    private readonly expresIn: string | number
  ) { }

  async auth (id: Guid): Promise<string> {
    const userId = id as string

    const accessToken = sign(
      { userId }, this.JWT_SECRET,
      { subject: userId, expiresIn: this.expresIn }
    )

    return accessToken
  }
}

export { AuthenticateJWTAdapter }
