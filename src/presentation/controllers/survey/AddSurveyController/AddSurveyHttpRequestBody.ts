interface Answer {
  readonly image: string
  readonly answer: string
}

interface AddSurveyHttpRequestBody {
  readonly question: string
  readonly answers: Answer[]
}

export { AddSurveyHttpRequestBody, Answer }
