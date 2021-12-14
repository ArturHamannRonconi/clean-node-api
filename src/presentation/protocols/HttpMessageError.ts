enum StatusCode {
  BAD_REQUEST=400,
  INTERNAL_SERVER=500
}

interface HttpMessageError {
  statusCode: StatusCode
  body: any
}

export { StatusCode }
export default HttpMessageError
