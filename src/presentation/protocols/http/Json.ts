interface Json {
  [field: string]:
  string | string[] |
  number | number[] |
  boolean | boolean[] |
  Json
}

export { Json }
