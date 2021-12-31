interface SignUpRequest {
  readonly name: string
  readonly email: string
  readonly password: string
  readonly passwordConfirmation: string
}

export { SignUpRequest }
