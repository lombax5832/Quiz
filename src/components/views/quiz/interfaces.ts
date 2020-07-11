
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
  sessionID: string
  dispatch: Function
  question: IQuestion
  fetchError?: Error
  quizError?: Error
  fetching: boolean
  currentQuestion: number
  questionsCount: number
  quizID: string,
  setActiveQuestion: (id: number) => void,
  setAppBarTitle: (title: string) => void,
  setUserAnswers: (selected: number[]) => void,
  fetchQuiz: (id: string) => void
}


export interface IQuestionViewProps {
  question: IQuestion
  currentQuestion: number
  setUserAnswers: (selected: number[], currentQuestion: number) => void
}
