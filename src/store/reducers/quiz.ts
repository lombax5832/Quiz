import { QuizAction } from '../actions/quiz';

const INITIAL_STATE = {
  fetching: false,
  fetch_error: undefined,
  quiz_data: undefined
}

const quizReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case QuizAction.QUIZ_DATA_FETCHING:
      return {...state, fetching: true}

    case QuizAction.QUIZ_DATA_FETCH_ERROR:
      return {...state, fetching: false, fetch_error: null}

    case QuizAction.QUIZ_DATA_FETCH_SUCCESS:
      return {...state, fetching: false, quiz_data: action.payload}

    default:
      return state;
  }
}

export default quizReducer;
