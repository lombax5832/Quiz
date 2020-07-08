export enum QuizAction {
  QUIZ_DATA_FETCHING = 'QUIZ_DATA_FETCHING',
  QUIZ_DATA_FETCH_SUCCESS = 'QUIZ_DATA_SUCCESS',
  QUIZ_DATA_FETCH_ERROR = 'QUIZ_DATA_FETCH_ERROR'
}

export function CreateQuizFetching() {
  return {
    type: QuizAction.QUIZ_DATA_FETCHING
  }
}

export function CreateQuizDataFetched(data: any) {
  return {
    type: QuizAction.QUIZ_DATA_FETCH_SUCCESS,
    payload: data
  }
}

export function CreateQuizDataFetchError(e: Error) {
  return {
    type: QuizAction.QUIZ_DATA_FETCH_ERROR,
    payload: e
  }
}
