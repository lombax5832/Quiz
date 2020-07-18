
export type IQuestionType = 'multi' | 'single';
export type IQuizType = 'practice' | 'exam';
export enum IQuizView {
  QUIZ ='QUIZ',
  RESULT='RESULT',
  REVIEW='REVIEW'
}

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
  showAnswer?: boolean
}

export interface IQuizSession {
  _id?: string
  quiz_id?: string
  quiz_label?: string
  quiz_type?: IQuizType
  quiz_view?: IQuizView
  start_time?: number
  elapsed_time?: number
  finish_time?: number
  passing_score?: number
  user_score?: number
  questions?: Array<IQuestion>
  active_question: number
}

export interface IQuizSessionProps {
  sessionID: string
  dispatch: Function
  question: IQuestion
  fetchError?: Error
  quizError?: Error
  quizType?: IQuizType
  fetching: boolean
  currentQuestion: number
  questionsCount: number
  quizID: string,
  isMarked?: boolean | string,
  setActiveQuestion: (id: number) => void,
  setAppBarTitle: (title: string) => void,
  setUserAnswers: ISetUserAnswer,
  fetchQuiz: (id: string) => void,
  toggleMarked: (currentQuestion: number) => void,
  toggleShowAnswer: () => void,
  setQuizView: (viewID: IQuizView) => void,
  gradeQuiz: (sessID: string) => void
}


export interface IQuestionViewProps {
  question: IQuestion
  currentQuestion: number
  setUserAnswers: ISetUserAnswer
}
