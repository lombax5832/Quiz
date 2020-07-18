import { IQuizView } from '../../components/views/quiz/interfaces';

export enum QuizAction {
  QUIZ_DATA_FETCHING = 'QUIZ_DATA_FETCHING',
  QUIZ_DATA_FETCH_SUCCESS = 'QUIZ_DATA_SUCCESS',
  QUIZ_DATA_FETCH_ERROR = 'QUIZ_DATA_FETCH_ERROR',
  SET_ACTIVE_QUESTION = 'SET_ACTIVE_QUESTION',
  SET_USER_ANSWERS = 'SET_USER_ANSWERS',
  TOGGLE_MARKED = 'TOGGLE_MARKED',
  SET_QUIZ_VIEW = 'SET_QUIZ_VIEW',
  CALCULATE_QUIZ_SCORE = 'CALCULATE_QUIZ_SCORE',
  QUIZ_TOGGLE_SHOW_ANSWER = 'QUIZ_TOGGLE_SHOW_ANSWER'
}

export function CreateToggleShowAnswer(){
  return {
    type: QuizAction.QUIZ_TOGGLE_SHOW_ANSWER
  }
}

export function CreateQuizFetching() {
  return {
    type: QuizAction.QUIZ_DATA_FETCHING,
  };
}

export function CreateQuizView(viewID: IQuizView){
  return {
    type: QuizAction.SET_QUIZ_VIEW,
    payload: viewID
  }
}


export function CreateCalculateScore(quizSessionID: string){
  return {
    type: QuizAction.CALCULATE_QUIZ_SCORE,
    payload: quizSessionID
  }
}


export function CreateQuizDataFetched(data: any) {
  return {
    type: QuizAction.QUIZ_DATA_FETCH_SUCCESS,
    payload: data,
  };
}

export function CreateQuizDataFetchError(e: Error) {
  return {
    type: QuizAction.QUIZ_DATA_FETCH_ERROR,
    payload: e,
  };
}

export function CreateSetActiveQuestion(id: number) {
  return {
    type: QuizAction.SET_ACTIVE_QUESTION,
    payload: id,
  };
}

export function CreateUserAnswers(userAnswers: number[], currentQuestion: number) {
  console.log('Entered CreateUserAnswers action creator with currentQuestion=', currentQuestion, 'userAnswers=', userAnswers)
  return {
    type: QuizAction.SET_USER_ANSWERS,
    payload: { userAnswers, currentQuestion },
  };
}

export function CreateToggleMarked(currentQuestion: number) {
  return {
    type: QuizAction.TOGGLE_MARKED,
    payload: currentQuestion
  };
}
