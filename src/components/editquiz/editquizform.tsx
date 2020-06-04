import Grid from '@material-ui/core/Grid';
import React, { useEffect, useReducer } from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import { FORM_NEW_QUIZ } from '../../consts';
import HttpClient from '../../httpclient/client';
import { useNavigate, useParams } from 'react-router';
import ICategory from '../../interfaces/ICategory';
import Form from './form';


const fetchCategories = (): Promise<Array<ICategory>> => {
  return HttpClient.get('/categories')
      .then(categories => {
            console.log('setting categories', categories.data);
            return categories.data;
          },
      ).catch(err => {
        console.log('fetch categories error', err);
        throw err;
      });
};

const fetchQuizData = (id?: string): Promise<any | null> => {
  if (!id) {
    return Promise.resolve(null);
  }


  return Promise.resolve(null);
};

const initialState = {
  categories: undefined,
  quizData: undefined,
  error: undefined,
};

export interface IQuizFormState {
  categories?: Array<ICategory>
  quizData: any
  error?: string
}

export type ActionType = 'SET_CATEGORIES' | 'SET_QUIZ_DATA' | 'FETCH_ERROR'

const reducer = (state: IQuizFormState, action: { type: ActionType, payload?: any }) => {

  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };

    case 'SET_QUIZ_DATA':
      return { ...state, quizData: action.payload };

    case 'FETCH_ERROR':
      return { ...state, error: action.payload };
  }

};

export interface IAction {
  type: ActionType,
  payload: any
}

const CreateCategories = (categories: Array<ICategory>): IAction => {
      return {
        type: 'SET_CATEGORIES',
        payload: categories,
      };
    }
;

const CreateQuizData = (quizData: any): IAction => {
  return {
    type: 'SET_QUIZ_DATA',
    payload: quizData,
  };
};

const CreateError = (error: string): IAction => {
  return {
    type: 'FETCH_ERROR',
    payload: error,
  };
};


const processSubmit = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      if (data.slug === 'ibm') {
        reject(new SubmissionError({ slug: 'This slug already exists' }));
      } else if (data.slug === 'err') {
        reject(new SubmissionError({ _error: 'Server Error. Submission Failed' }));
      } else {
        resolve(true);
      }

    }, 1000);
  });
};


/**
 * pre-load all existing categories from server.
 * Validate title and slug so that it is unique - when adding
 * new category slug and title must not already exist.
 *
 * @param props
 * @constructor
 */
const Editquizform = (props: any) => {
  const { handleSubmit, reset, submitting, initialize, error } = props;
  const [state, dispatch] = useReducer(reducer, { ...initialState });
  const params = useParams();
  console.log('QuizForm params: ', params);

  const navigate = useNavigate();

  const title = (params.id) ? 'Edit Quiz':'Create Quiz';

  /**
   * fetch existing categories from api.
   */
  useEffect(() => {

    Promise.all([fetchCategories(), fetchQuizData(params.id)])
        .then(results => {
          const qData = results[1];
          dispatch(CreateCategories(results[0]));
          if(qData){
            initialize(qData);
          }
        }).catch(e => {
      console.error('QuizForm fetch error', e);
      dispatch(CreateError('Failed to fetch Data'));
    });
  }, []);

  const submitHandler = handleSubmit((data, dispatch) => {
    console.log('your form detail here', data);
    return processSubmit(data).then(() => {
      navigate('../success');
    });
  });


  if (state.error) {
    return (
        <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justify="center"
        >
          <Grid item style={{ width: '100%' }}>
            <h1>ERROR</h1>
            <h2>{state.error}</h2>
          </Grid>
        </Grid>
    );
  } else {


    return (
        <Form
            title={title}
            loaded={!!state.categories}
            categories={state.categories}
            reset={reset}
            submitting={submitting}
            error={error}
            handleSubmit={submitHandler}
        />
    );
  }
};


export default reduxForm({
  form: FORM_NEW_QUIZ,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(Editquizform);

