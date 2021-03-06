import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IQuizSessionProps, IQuizView } from './interfaces';
import HttpClient from '../../../httpclient/client';

import {
  CreateCalculateScore,
  CreateQuizDataFetched,
  CreateQuizDataFetchError,
  CreateQuizFetching,
  CreateQuizView,
  CreateSetActiveQuestion,
  CreateToggleMarked,
  CreateToggleShowAnswer,
  CreateUserAnswers,
} from '../../../store/actions/quiz';
import { connect } from 'react-redux';
import { CardContent, CardHeader, Container, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FormMessageBar from '../../formloadingerrorbar';
import ErrorTile from '../../errortile';
import { ClearAppBarTitle, CreateAppBarTitle } from '../../../store/actions/appbar';
import { DEFAULT_PASSING_SCORE } from '../../../consts/configuration';
import QuizScore from './quizscore';
import QuizView from './quizview';
import QuestionTable from './questiontable';


const useStyles = makeStyles({
  bottomBar: {
    display: 'block',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 1202,
    padding: '5px',
  },
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
  disabled: {
    color: '#c3bdbd',
  },
});


const mapStateToProps = (state) => {

  const currentQuestion = state.quiz_session?.quiz_data?.active_question;
  const questionsCount = state.quiz_session?.quiz_data?.questions?.length || 0;
  const question = currentQuestion!==undefined ? state.quiz_session?.quiz_data?.questions?.[currentQuestion]:null;
  const quizID = state.quiz_session?.quiz_data?.quiz_id;
  const sessionID = state.quiz_session?.quiz_data?._id;
  const fetchError = state.quiz_session?.fetch_error;
  const quizType = state.quiz_session?.quiz_data?.quiz_type;
  const fetching = !!state.quiz_session?.fetching;
  const viewID = state.quiz_session?.quiz_data?.quiz_view || IQuizView.QUIZ;
  const userScore = state.quiz_session?.quiz_data?.user_score;
  const passingScore = state.quiz_session?.quiz_data?.passing_grade || DEFAULT_PASSING_SCORE;
  const finishTime = state.quiz_session?.quiz_data?.finish_time;
  const elapsedTime = state.quiz_session?.quiz_data?.elapsed_time;
  const questions = state.quiz_session?.quiz_data?.questions;

  return {
    finishTime,
    elapsedTime,
    questions,
    sessionID,
    quizID,
    currentQuestion,
    questionsCount,
    question,
    fetching,
    fetchError,
    viewID,
    quizType,
    userScore,
    passingScore
  };

};

const mapDispatchToProps = (dispatch: Function) => {

  return {
    dispatch,
    setActiveQuestion: (id: number) => dispatch(CreateSetActiveQuestion(id)),
    setUserAnswers: (userAnswers: number[], currentQuestion: number) => dispatch(CreateUserAnswers(userAnswers, currentQuestion)),
    setAppBarTitle: (title: string) => dispatch(CreateAppBarTitle(title)),
    toggleShowAnswer: () => dispatch(CreateToggleShowAnswer()),
    toggleMarked: (currentQuestion: number) => {
      dispatch(CreateToggleMarked(currentQuestion));
    },
    gradeQuiz: (sessID: string) => {
      dispatch(CreateCalculateScore(sessID));
    },
    setQuizView: (viewID: IQuizView) => {
      dispatch(CreateQuizView(viewID));
    },
    fetchQuiz: (id: string) => {
      dispatch(CreateQuizFetching());
      HttpClient.get(`/quizsession/${id}`).then(response => {
        dispatch(CreateQuizDataFetched(response.data));
        dispatch(CreateAppBarTitle('Practice Quiz'));
      }).catch(e => {
        dispatch(CreateQuizDataFetchError(e));
      });
    },
  };
};

const QuizSession = (props: IQuizSessionProps) => {
  console.log('Entered QuizSession with props', props);
  const classes = useStyles();
  const params = useParams();
  const { session_id } = params;
  const {
    viewID,
    fetchQuiz,
    currentQuestion,
    questionsCount,
    dispatch,
    setAppBarTitle,
    toggleMarked,
    question,
  } = props;
  console.log('entered QuizSession with sessionID', session_id);

  useEffect(() => {
    fetchQuiz(session_id);
    return () => dispatch(ClearAppBarTitle());
  }, [session_id]);

  let ret: React.ReactElement;

  if (props.fetchError) {
    ret = <ErrorTile message={props.fetchError.message} errorTitle="Error"
                     btnRetry={{ label: 'Retry', onClick: () => fetchQuiz(session_id) }}/>;
  } else {
    switch (viewID) {
      case IQuizView.RESULT:
        ret = <QuizScore {...props}/>
        break;

      case IQuizView.QUIZ:
        ret = <QuizView {...props}/>
        break;

      case IQuizView.REVIEW:
        return <QuestionTable {...props}/>;
        break;
    }
  }


  return (

      <Container maxWidth="md">
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="stretch"
            justify="space-between"
        >
          <FormMessageBar loading={!!props.fetching} error={props.quizError?.message}/>
          {ret}
        </Grid>

      </Container>
  );

};

export default connect(mapStateToProps, mapDispatchToProps)(QuizSession);
