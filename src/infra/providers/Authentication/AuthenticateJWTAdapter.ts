import { sign, verify } from 'jsonwebtoken'

import { Authenticate, ReaderAuthentication } from '../../../data/protocols/providers'
import { Guid } from '../../../domain/protocols/Guid'

class AuthenticateJWTAdapter implements Authenticate, ReaderAuthentication {
  constructor (
    private readonly JWT_SECRET: string,
    private readonly expresIn: string | number
  ) { }

  async readAccessToken (accessToken: string): Promise<Guid> {
    const { sub: accountId } = verify(accessToken, this.JWT_SECRET)
    return accountId as Guid
  }

  async auth (id: Guid): Promise<string> {
    const accountId = id as string

    const accessToken = sign(
      { accountId }, this.JWT_SECRET,
      { subject: accountId, expiresIn: this.expresIn }
    )

    return accessToken
  }
}

export { AuthenticateJWTAdapter }
