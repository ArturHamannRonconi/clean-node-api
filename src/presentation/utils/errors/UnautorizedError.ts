class UnautorizedError extends Error {
  constructor () {
    super('Unautorized')
    Object.setPrototypeOf(this, UnautorizedError.prototype)
    this.name = 'UnautorizedError'
  }
}

export { UnautorizedError }
