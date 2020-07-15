import { QuizAction } from '../actions/quiz';
import { IQuestion } from '../../components/views/quiz/interfaces';

const INITIAL_STATE = {
  fetching: false,
  fetch_error: undefined,
  quiz_data: undefined,
};

const updateUserAnswers = (currentQuestion: number, questions: IQuestion[] = [], userAnswers: number[] = []) => {

  const updatedQuestion = { ...questions[currentQuestion] };
  updatedQuestion.userAnswers = userAnswers;

  const ret = [...questions];

  console.log('Updating question at index', currentQuestion, 'newQuestion', updatedQuestion)
  ret.splice(currentQuestion, 1, updatedQuestion);

  console.log('Returning updatedUserAnswers=', ret);
  return ret;
};

const updateMarked = (currentQuestion: number, questions: IQuestion[] = []) => {
  const ret = [...questions]

  ret[currentQuestion].isMarked = !ret[currentQuestion].isMarked

  return ret
}

const quizReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QuizAction.QUIZ_DATA_FETCHING:
      return { ...state, fetching: true };

    case QuizAction.QUIZ_DATA_FETCH_ERROR:
      return { ...state, fetching: false, fetch_error: action.payload };

    case QuizAction.QUIZ_DATA_FETCH_SUCCESS:
      return { ...state, fetching: false, quiz_data: action.payload, fetch_error: null };

    case QuizAction.SET_ACTIVE_QUESTION:
      return { ...state, quiz_data: { ...state.quiz_data, active_question: action.payload } };

    case QuizAction.SET_USER_ANSWERS:
      return {
        ...state,
        quiz_data: {
          ...state.quiz_data, questions: updateUserAnswers(
            state.quiz_data.active_question,
            state.quiz_data.questions,
            action.payload.userAnswers,
          ),
        },
      };

    case QuizAction.TOGGLE_MARKED:
      return {
        ...state,
        quiz_data: {
          ...state.quiz_data,
          questions: updateMarked(action.payload, state.quiz_data.questions)
        }
      }

    default:
      return state;
  }
};

export default quizReducer;
