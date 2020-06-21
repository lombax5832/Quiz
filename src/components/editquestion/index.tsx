import React, { useReducer, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { reduxForm } from 'redux-form';
import { FORM_NAME } from '../../consts';
import { ICategoryWithQuizzes } from '../../interfaces/ICategory';
import HttpClient from '../../httpclient/client';
import ErrorTile from '../errortile';
import Form from './form';
import { Container } from '@material-ui/core';
import { IQuizWithCategory } from '../../interfaces/IQuiz';

export type ActionType = 'SET_CATEGORIES' | 'SET_QUESTION_DATA' | 'FETCH_ERROR' | 'RESET_STATE' | 'SUBMIT_SUCCESS'


const processSubmit = (data) => {
  if (data._id) {
    return HttpClient.put(`/questions/${data._id}`, data);
  } else {
    return HttpClient.post(`/questions/new`, data);
  }
};

export interface IAction {
  type: ActionType,
  payload?: any
}

export interface IQuestionFormState {
  categories?: Array<IQuizWithCategory>
  question: any
  error?: string
}

const initialState = {
  categories: [],
  question: undefined,
  error: undefined,
};

const fetchCategories = (): Promise<Array<IQuizWithCategory>> => {
  return HttpClient.get('/quizzes/with_categories')
      .then(quizzes => {
            console.log('setting quizzes', quizzes.data);
            return quizzes.data;
          },
      ).catch(err => {
        console.log('fetch quizzes error', err);
        throw err;
      });
};

const fetchQuestionData = (id?: string): Promise<any | null> => {
  if (!id) {
    return Promise.resolve(null);
  }


  return HttpClient.get(`/questions/${id}`);
};

const reducer = (state: IQuestionFormState, action: { type: ActionType, payload?: any }) => {

  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };

    case 'SET_QUESTION_DATA':
      return { ...state, question: action?.payload?.data };

    case 'FETCH_ERROR':
      return { ...state, error: action.payload };

    case 'RESET_STATE':
      return { ...initialState };

    case 'SUBMIT_SUCCESS':
      return { ...initialState, quiz_id: action.payload };

    default:
      return state;
  }

};

const loadData = (dispatch: Function, id?: string) => {
  console.log('entered loadData with id=', id);
  dispatch(ResetState());
  return Promise.all([fetchCategories(), fetchQuestionData(id)])
      .then(results => {
        const qData = results[1];
        dispatch(CreateCategories(results[0]));
        dispatch(CreateQuestionData(qData));
        return results;
      })
      .catch(e => {
        console.error('QuizForm fetch error', e);
        dispatch(CreateError('Failed to fetch Data'));
        throw e;
      });
};

const CreateCategories = (categories: Array<IQuizWithCategory>): IAction => {
      return {
        type: 'SET_CATEGORIES',
        payload: categories,
      };
    }
;

const CreateQuestionData = (question: any): IAction => {
  return {
    type: 'SET_QUESTION_DATA',
    payload: question,
  };
};

const CreateError = (error: string): IAction => {
  return {
    type: 'FETCH_ERROR',
    payload: error,
  };
};

const ResetState = (): IAction => {
  return {
    type: 'RESET_STATE',
  };
};

const CreateSubmitSuccess = (quiz_id: string): IAction => {
  return {
    type: 'SUBMIT_SUCCESS',
    payload: quiz_id
  }
}

let QuestionForm = (props: any) => {
  const { handleSubmit, reset, submitting, initialize, error } = props;

  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, { ...initialState });
  const params = useParams();
  console.log('QuizForm params: ', params);

  /**
   * fetch existing categories from api.
   */
  useEffect(() => {
    loadData(dispatch, params.id).then(results => {
      if (results[1] && results[1].data) {
        initialize(results[1].data);
      }
    });
  }, []);

  const submitHandler = handleSubmit((data, dispatch) => {
    console.log('your form detail here', data);
    return processSubmit(data).then(() => {
      /**
       * @todo get value of quiz_id and set it into state
       * then dispatch action like SUCCESS
       * a new tile will be rendered on same view with button
       * to
       * 'Create another question for this quiz',
       * 'Create another question for different quiz',
       * 'Edit this question'
       *
       * and
       * a button to navigate to home, later also a button to navigate
       * to editor. if Create another question for this quiz button is clicked
       * it must call initialize with object that has only quiz_id so this way
       * a new form will have Quiz drop-down menu selected on that quiz_id.
       */
      dispatch(CreateSubmitSuccess(data.quiz_id))
      navigate('../success');
    });
  });

  return (
      <Container maxWidth="lg">
        {state.error && <ErrorTile message={state.error} errorTitle="Error"
                                   btnRetry={{ label: 'Retry', onClick: () => loadData(dispatch, params.id) }}/>}
        {!state.error && <Form
            title="Edit Question"
            loaded={state.categories.length > 0}
            categories={state.categories}
            reset={reset}
            retry={() => loadData(dispatch, params.id)}
            submitting={submitting}
            error={error}
            handleSubmit={submitHandler}
        />}
      </Container>
  );
};

export default reduxForm({
  form: FORM_NAME,
  initialValues: {
    question: 'Can you answer this question?',
    qtype: 'multi',
    quiz_id: '5edae0418ead5c106c0357c5',
    answers: [{
      body: 'This is correct',
      explanation: 'Explain 1',
      isCorrect: true,
    },
      {
        body: 'Answer 2',
        explanation: 'Explain 2',
      }],
  },
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(QuestionForm);
