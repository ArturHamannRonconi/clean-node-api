class CompareError extends Error {
  constructor () {
    super('The fields aren\'t comparables')
    Object.setPrototypeOf(this, CompareError.prototype)
    this.name = 'CompareError'
  }
}

export { CompareError }
