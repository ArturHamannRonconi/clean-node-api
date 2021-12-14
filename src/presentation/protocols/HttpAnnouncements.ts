interface Json {
  [field: string]:
  string | string[] |
  number | number[] |
  boolean | boolean[] |
  Json
}

interface HttpRequest {
  body?: Json
  headers?: Json
}

interface HttpResponse {
  statusCode?: number
  body?: Json
  headers?: Json
}

export { HttpRequest, HttpResponse, Json }