class AccessDeniedError extends Error {
  constructor () {
    super('Denied!')
    Object.setPrototypeOf(this, AccessDeniedError.prototype)
    this.name = 'AccessDeniedError'
  }
}

export { AccessDeniedError }
