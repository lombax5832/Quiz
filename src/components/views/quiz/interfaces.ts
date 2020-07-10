
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
  fetchError?: Error
  quizError?: Error
  fetching: boolean
  sessionID: string
  currentQuestion: number
  questionsCount: number
  quizID: string,
  setActiveQuestion: (id: number) => void,
  fetchQuiz: (id: string) => void
}
