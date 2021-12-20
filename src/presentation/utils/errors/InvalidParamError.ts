class InvalidParamError extends Error {
  constructor (fieldName: string) {
    super(`Invalid param: ${fieldName}`)
    Object.setPrototypeOf(this, InvalidParamError.prototype)
    this.name = 'InvalidParamError'
  }
}

export { InvalidParamError }
