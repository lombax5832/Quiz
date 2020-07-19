import { QuizAction } from '../actions/quiz';
import { IQuestion, IQuizSession, IQuizView } from '../../components/views/quiz/interfaces';
import checkAnswer from '../../components/lib/check_answer';

export interface IQuizData {
  fetching: boolean
  fetch_error?: Error
  quiz_data?: IQuizSession
}

const INITIAL_STATE: IQuizData = {
  fetching: false,
  fetch_error: undefined,
  quiz_data: { active_question: 0 },
};

const updateUserAnswers = (currentQuestion: number, questions: IQuestion[] = [], userAnswers: number[] = []) => {

  const updatedQuestion = { ...questions[currentQuestion] };
  updatedQuestion.userAnswers = userAnswers;

  const ret = [...questions];

  console.log('Updating question at index', currentQuestion, 'newQuestion', updatedQuestion);
  ret.splice(currentQuestion, 1, updatedQuestion);

  console.log('Returning updatedUserAnswers=', ret);
  return ret;
};

const toggleShowAnswer = (quizData: IQuizSession): Array<IQuestion> => {

  console.log('entered toggleShowAnswer with quizData', quizData, 'active_question', quizData.active_question);

  if (quizData.quiz_type==='practice' &&
      quizData.questions &&
      quizData.questions.length > 0 &&
      quizData.active_question!==undefined
  ) {

    const { questions } = quizData;
    const updatedQuestion = { ...questions[quizData.active_question] };

    updatedQuestion.showAnswer = !updatedQuestion.showAnswer;

    questions.splice(quizData.active_question, 1, updatedQuestion);

    return questions;
  } else {
    return quizData.questions;
  }
};

const updateMarked = (currentQuestion: number, questions: IQuestion[] = []) => {
  const ret = [...questions];

  const updatedQuestion = { ...questions[currentQuestion] };
  updatedQuestion.isMarked = !updatedQuestion.isMarked;

  ret.splice(currentQuestion, 1, updatedQuestion);

  return ret;
};


function calculateScore(quiz_data: IQuizSession, sessID?: string): number {

  console.log('entered calculateScore with questions=', quiz_data.questions);

  if (quiz_data.user_score!==undefined) {
    console.log('calculateScore user score already calculated', quiz_data.user_score);
    return quiz_data.user_score;
  }

  if (!quiz_data.questions) {
    console.log('calculateScore no questions');
    return 0;
  }

  const countCorrectAnwers = quiz_data.questions.reduce((numCorrect, question) => {

    return checkAnswer(question) + numCorrect;
  }, 0);

  return Math.floor((countCorrectAnwers / quiz_data.questions.length) * 100 );
}

const quizReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QuizAction.QUIZ_DATA_FETCHING:
      return { ...state, fetching: true };

    case QuizAction.QUIZ_DATA_FETCH_ERROR:
      return { ...state, fetching: false, fetch_error: action.payload };

    case QuizAction.QUIZ_DATA_FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        quiz_data: { ...action.payload, start_time: action.payload.start_time || Date.now() },
        fetch_error: null,
      };

    case QuizAction.SET_ACTIVE_QUESTION:
      return {
        ...state,
        quiz_data: {
          ...state.quiz_data,
          active_question: action.payload,
          quiz_view: IQuizView.QUIZ,
        },
      };

    case QuizAction.SET_USER_ANSWERS:
      return {
        ...state,
        quiz_data: {
          ...state.quiz_data, questions: updateUserAnswers(
              state.quiz_data.active_question,
              state.quiz_data.questions,
              action.payload.userAnswers,
          ),
          quiz_view: IQuizView.QUIZ,
        },
      };

    case QuizAction.TOGGLE_MARKED:
      return {
        ...state,
        quiz_data: {
          ...state.quiz_data,
          questions: updateMarked(action.payload, state.quiz_data.questions),
        },
      };

    case QuizAction.CALCULATE_QUIZ_SCORE:
      return {
        ...state,
        quiz_data: {
          ...state.quiz_data,
          user_score: calculateScore(state.quiz_data),
          quiz_view: IQuizView.RESULT,
          finish_time: state.quiz_data.finish_time || Date.now(),
          elapsed_time: (state.quiz_data.finish_time) ? state.quiz_data.elapsed_time:(Date.now() - state.quiz_data.start_time),
        },
      };

    case QuizAction.QUIZ_TOGGLE_SHOW_ANSWER:
      return {
        ...state,
        quiz_data: {
          ...state.quiz_data,
          questions: toggleShowAnswer(state.quiz_data),
        },
      };

    case QuizAction.SET_QUIZ_VIEW:
      return {
        ...state,
        quiz_data: {
          ...state.quiz_data,
          quiz_view: action.payload,
        },
      };

    default:
      return state;
  }
};

export default quizReducer;
