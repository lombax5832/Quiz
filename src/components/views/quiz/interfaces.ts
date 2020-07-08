
export interface IAnswer {
  isCorrect: boolean
  body: string
  explanation?: string
}

export interface IQuestion {
  _id?: string
  qtype: 'multi' | 'single'
  quiz_id: string
  question: string
  answers: Array<IAnswer>
  userAnswers?: number[]
}

export interface IQuizSession {
  _id: string
  quiz_id: string
  quiz_type: 'practice' | 'exam'
  questions: Array<IQuestion>
  active_question: number
}

export interface IQuizSessionProps {
  dispatch: Function
  question: IQuestion
  session_id: string
  active_question: number
}
