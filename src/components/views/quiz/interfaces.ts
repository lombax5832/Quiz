
export type IQuestionType = 'multi' | 'single';
export type IQuizType = 'practice' | 'exam';
export type IQuizMode = 'quiz' | 'review';

export type ISetUserAnswer = (selected: number[], currentQuestion: number) => void

export interface IAnswer {
  isCorrect: boolean
  body: string
  explanation?: string
}

export interface IQuestion {
  _id?: string
  qtype: IQuestionType
  quiz_id: string
  question: string
  answers: Array<IAnswer>
  userAnswers?: number[]
  isMarked?: boolean | string
}

export interface IQuizSession {
  _id: string
  quiz_id: string
  quiz_type: IQuizType
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
  isMarked?: boolean | string,
  setActiveQuestion: (id: number) => void,
  setAppBarTitle: (title: string) => void,
  setUserAnswers: ISetUserAnswer,
  fetchQuiz: (id: string) => void,
  toggleMarked: (currentQuestion: number) => void
}


export interface IQuestionViewProps {
  question: IQuestion
  currentQuestion: number
  setUserAnswers: ISetUserAnswer
}
