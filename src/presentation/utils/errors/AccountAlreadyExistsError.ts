class AccountAlreadyExistsError extends Error {
  constructor () {
    super('Account Already exists')
    Object.setPrototypeOf(this, AccountAlreadyExistsError.prototype)
    this.name = 'AccountAlreadyExistsError'
  }
}

export { AccountAlreadyExistsError }
