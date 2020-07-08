import React, { useEffect, useReducer } from 'react';
import HttpClient from '../../../httpclient/client';
import { useParams, useNavigate } from 'react-router';
import { IQuiz } from '../../../interfaces/IQuiz';
import ErrorTile from '../../errortile';
import Card from '@material-ui/core/Card';
import { Button, CardContent, CardHeader, Container, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormMessageBar from '../../formloadingerrorbar';
import Grid from '@material-ui/core/Grid';

export type ActionType =
    'FETCH_SUCCESS'
    | 'FETCH_ERROR'
    | 'START_FETCHING'
    | 'RANDOMIZE_QUESTIONS'
    | 'RANDOMIZE_ANSWERS'
    | 'FETCH_SESSION_ERROR'


const TAG = 'START_QUIZ';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  list: {
    width: '100%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  quizName: {
    fontSize: '100%',
  },
  pos: {
    marginBottom: 12,
  },
  divider: {
    marginTop: 10,
  },
});


export interface IAction {
  type: ActionType,
  payload?: any
}

export interface IQuizSessionOptions {
  quiz_id: string
  num_questions?: number
  randomize_questions: boolean
  randomize_answers: boolean
}

export interface IStartQuizState {
  quiz_data?: IQuiz
  error?: Error
  quiz_session_error?: Error
  fetching: boolean
  randomize_questions?: boolean
  randomize_answers?: boolean
}

const initialState: IStartQuizState = {
  quiz_data: undefined,
  error: undefined,
  fetching: true,
  randomize_questions: false,
  randomize_answers: false,
};


const CreateQuizData = (data: IQuiz): IAction => {
  return {
    type: 'FETCH_SUCCESS',
    payload: data,
  };
};

const CreateRandomizeQ = (data: boolean): IAction => {
  return {
    type: 'RANDOMIZE_QUESTIONS',
    payload: data,
  };
};

const CreateRandomizeA = (data: boolean): IAction => {
  return {
    type: 'RANDOMIZE_ANSWERS',
    payload: data,
  };
};

const CreateError = (error: Error): IAction => {
  return {
    type: 'FETCH_ERROR',
    payload: error,
  };
};

const CreateSessionFetchError = (error: Error): IAction => {
  return {
    type: 'FETCH_SESSION_ERROR',
    payload: error,
  };
};

const CreateFetching = (): IAction => {
  return {
    type: 'START_FETCHING',
  };
};

/**
 * Initially need data about the quiz.
 * @param dispatch Function
 * @param quiz_id string
 */
const loadData = (dispatch: Function, quiz_id: string) => {
  dispatch(CreateFetching());
  HttpClient.get(`/quizzes/${quiz_id}`)
      .then(response => {
            console.log(TAG, 'Got data', response.data);
            dispatch(CreateQuizData(response.data));
          },
      ).catch(err => {
    console.log(TAG, 'fetch categories error', err);
    dispatch(CreateError(new Error(`Failed to Create new Quiz Session. ${err.message}`)));
  });
};


const getQuizSession = (options: IQuizSessionOptions, dispatch: Function, navigate: Function) => {
  return HttpClient.post('/quizsession/new', options)
      .then(response => {
        if (response.data?.session_id) {
          console.log(TAG, `redirecting to quiz session ${response.data.session_id}`);
          navigate(`/quiz/${response.data.session_id}`);
        } else {
          console.log(TAG, `Invalid response from quiz session`);
          dispatch(CreateSessionFetchError(new Error(`Unable to create quiz session. Please try again`)));
        }
      })
      .catch(e => {
        console.log(TAG, 'get quiz_session error', e);
        dispatch(CreateSessionFetchError(new Error(`Unable to create quiz session. ${e.message}`)));
      });
};


const reducer = (state: IStartQuizState, action: { type: ActionType, payload?: any }): IStartQuizState => {

  switch (action.type) {
    case 'START_FETCHING':
      return { ...state, fetching: true, error: undefined, quiz_session_error: undefined };

    case 'FETCH_ERROR':
      return { quiz_data: undefined, fetching: false, error: action.payload, quiz_session_error: undefined };

    case 'FETCH_SUCCESS':
      return { quiz_data: action.payload, fetching: false, error: undefined, quiz_session_error: undefined };

    case 'RANDOMIZE_ANSWERS':
      return { ...state, randomize_answers: action.payload };

    case 'RANDOMIZE_QUESTIONS':
      return { ...state, randomize_questions: action.payload };

    case 'FETCH_SESSION_ERROR':
      return { ...state, quiz_session_error: action.payload, fetching: false };
  }
};


const StartQuiz = () => {
  const classes = useStyles();
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, { ...initialState });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleChange for ', event.target.name, 'val:', event.target.checked);
    switch (event.target.name) {
      case 'randomize_answers':
        dispatch(CreateRandomizeA(event.target.checked));
        break;

      case 'randomize_questions':
        dispatch(CreateRandomizeQ(event.target.checked));
        break;
    }
  };

  useEffect(() => {
    loadData(dispatch, id);
  }, [id]);

  let ret: React.ReactElement;

  if (state.error) {
    ret = <ErrorTile message={state.error.message} errorTitle="Error"
                     btnRetry={{ label: 'Retry', onClick: () => loadData(dispatch, id) }}/>;
  } else if (state.quiz_data) {
    ret = (
        <Grid item xs={12}>
          <Card className={classes.root}>
            <CardHeader title={state.quiz_data.title}/>
            <CardContent>
              <Typography variant="h6">{state.quiz_data.description}</Typography>
              <div style={{ display: 'block', marginTop: '10px' }}>
                <Typography variant="subtitle1">Quiz Options</Typography>
                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                        control={<Switch color="primary" onChange={handleChange}
                                         name="randomize_questions"/>}
                        label="Randomize Questions"
                    />
                    <FormControlLabel
                        control={<Switch color="primary" onChange={handleChange}
                                         name="randomize_answers"/>}
                        label="Randomize Answers"
                    />

                  </FormGroup>

                </FormControl>
              </div>
            </CardContent>
            <CardActions>
              <Button variant="contained" size="medium" color="primary" onClick={() => {
                const data = {
                  randomize_questions: state.randomize_questions,
                  randomize_answers: state.randomize_answers,
                  quiz_id: id,
                };
                getQuizSession(data, dispatch, navigate);
              }}>Start Quiz</Button>
            </CardActions>
          </Card>
        </Grid>
    );
  }

  return (
      <Container maxWidth="md">
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="stretch"
            justify="center"
        >
          <FormMessageBar loading={state.fetching} error={state.quiz_session_error?.message}/>
          {ret}
        </Grid>
      </Container>
  );
};

export default StartQuiz;
