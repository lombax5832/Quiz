import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import React, { useReducer, useEffect } from 'react';
import { useParams } from 'react-router';
import { FieldArray, reduxForm } from 'redux-form';
import { FORM_NAME } from '../../consts';
import AddAnswer from './addanswer';
import EditExplanation from './editexplanation';
import EditQuestion from './question';
import QuestionMeta from './questionmeta';
import renderAnswers from './renderanswers';
import { ICategoryWithQuizzes } from '../../interfaces/ICategory';
import HttpClient from '../../httpclient/client';

export type ActionType = 'SET_QUIZZES' | 'SET_QUESTION_DATA' | 'FETCH_ERROR' | 'RESET_STATE'

export interface IAction {
  type: ActionType,
  payload?: any
}

export interface IQuestionFormState {
  quizzes?: Array<ICategoryWithQuizzes>
  question: any
  error?: string
}

const initialState = {
  quizzes: [],
  question: undefined,
  error: undefined,
};

const fetchQuizzes = (): Promise<Array<ICategoryWithQuizzes>> => {
  return HttpClient.get('/categories/with_quizzes')
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

  return Promise.resolve(null);
  //return HttpClient.get(`/quizzes/${id}`);
};

const reducer = (state: IQuestionFormState, action: { type: ActionType, payload?: any }) => {

  switch (action.type) {
    case 'SET_QUIZZES':
      return { ...state, quizzes: action.payload };

    case 'SET_QUESTION_DATA':
      return { ...state, question: action?.payload?.data };

    case 'FETCH_ERROR':
      return { ...state, error: action.payload };

    case 'RESET_STATE':
      return { ...initialState };
  }

};

const loadData = (dispatch: Function, id?: string) => {
  console.log('entered loadData with id=', id);
  dispatch(ResetState());
  return Promise.all([fetchQuizzes(), fetchQuestionData(id)])
    .then(results => {
      const qData = results[1];
      dispatch(CreateQuizzes(results[0]));
      dispatch(CreateQuestionData(qData));
      return results
    })
    .catch(e => {
      console.error('QuizForm fetch error', e);
      dispatch(CreateError('Failed to fetch Data'));
      throw e
    });
};

const CreateQuizzes = (quizzes: Array<ICategoryWithQuizzes>): IAction => {
  return {
    type: 'SET_QUIZZES',
    payload: quizzes,
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

let QuestionForm = (props: any) => {
  const { handleSubmit, reset, initialize } = props;

  const [state, dispatch] = useReducer(reducer, { ...initialState });
  const params = useParams();
  console.log('QuizForm params: ', params);

  /**
   * fetch existing categories from api.
   */
  useEffect(() => {
    loadData(dispatch, params.id).then(results => {
      if (results[1] && results[1].data) {
        //initialize(results[1].data);
      }
    });
  }, []);
  
  return (
      <div style={{ flexGrow: 1 }}>
        <CssBaseline />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <QuestionMeta reset={reset} quizzes={state.quizzes} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <EditQuestion />
              <EditExplanation />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AddAnswer />
              <FieldArray name="answers" component={renderAnswers} />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>

          </Grid>
        </form>
      </div>
  );
};

export default reduxForm({
  form: FORM_NAME,
  initialValues: {
    question: 'Can you answer this question?',
    qtype: 'multi',
    answers: [{
      body: 'This is correct',
      explanation: 'Explain 1',
      isCorrect: true
    },
    {
      body: 'Answer 2',
      explanation: 'Explain 2',
    }],
  },
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: (data) => {
    console.log(data);
  },
})(QuestionForm);
