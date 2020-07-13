import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IQuizSessionProps } from './interfaces';
import HttpClient from '../../../httpclient/client';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {
  CreateQuizDataFetched,
  CreateSetActiveQuestion,
  CreateQuizDataFetchError,
  CreateQuizFetching, CreateUserAnswers,
} from '../../../store/actions/quiz';
import { connect } from 'react-redux';
import { Button, CardContent, CardHeader, Container, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FormMessageBar from '../../formloadingerrorbar';
import ErrorTile from '../../errortile';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import { ClearAppBarTitle, CreateAppBarTitle } from '../../../store/actions/appbar';
import QuestionView from './question/question';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


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
});


const mapStateToProps = (state) => {

  const currentQuestion = state.quiz_session?.quiz_data?.active_question;
  const questionsCount = state.quiz_session?.quiz_data?.questions?.length || 0;
  const question = currentQuestion!==undefined ? state.quiz_session?.quiz_data.questions[currentQuestion]:null;
  const quizID = state.quiz_session?.quiz_session?.quiz_id;
  const sessionID = state.quiz_session?.quiz_session?._id;
  const fetchError = state.quiz_session?.fetch_error;
  const fetching = !!state.quiz_session?.fetching;

  return {
    sessionID,
    quizID,
    currentQuestion,
    questionsCount,
    question,
    fetching,
    fetchError,
  };

};

const mapDispatchToProps = (dispatch: Function) => {

  return {
    dispatch,
    setActiveQuestion: (id: number) => dispatch(CreateSetActiveQuestion(id)),
    setUserAnswers: (userAnswers: number[], currentQuestion: number) => dispatch(CreateUserAnswers(userAnswers, currentQuestion)),
    setAppBarTitle: (title: string) => dispatch(CreateAppBarTitle(title)),
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
  const { fetchQuiz, setActiveQuestion, currentQuestion, questionsCount, dispatch, setAppBarTitle } = props;
  console.log('entered QuizSession with sessionID', session_id);

  useEffect(() => {
    fetchQuiz(session_id);
    return () => dispatch(ClearAppBarTitle());
  }, [session_id]);

  let ret: React.ReactElement;

  if (props.fetchError) {
    ret = <ErrorTile message={props.fetchError.message} errorTitle="Error"
                     btnRetry={{ label: 'Retry', onClick: () => fetchQuiz(session_id) }}/>;
  } else if (props.question) {
    const cardHeader = `Question ${currentQuestion + 1} of ${questionsCount}`;
    setAppBarTitle(cardHeader);
    ret = (
        <Grid item xs={12} style={{ marginBottom: '30px' }}>
          <Card className={classes.root}>
            <CardHeader title={cardHeader}
                        style={{ textAlign: 'center' }}
                        action={
                          <FormControlLabel
                              value="start"
                              control={<Checkbox
                                  disableRipple
                                  style={{background:'transparent'}}
                                  color="default"
                              />}
                              label="Mark"
                              labelPlacement="start"
                          />
                        }/>
            <CardContent>
              <div style={{ display: 'block', marginTop: '10px' }}>
                <QuestionView {...props}/>
              </div>
            </CardContent>
          </Card>
          <Paper className={classes.bottomBar}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}
            >
              <Grid item>
                <Button variant="contained"
                        size="medium"
                        startIcon={<Icon>navigate_before</Icon>}
                        disabled={currentQuestion < 1}
                        onClick={() => {
                          setActiveQuestion(currentQuestion - 1);
                        }}>Previous</Button>
              </Grid>
              <Grid item>
                <Button variant="contained"
                        size="medium"
                        endIcon={<Icon>navigate_next</Icon>}
                        disabled={(props.currentQuestion + 1) >= props.questionsCount} onClick={() => {
                  setActiveQuestion(currentQuestion + 1);
                }}><u>N</u>ext</Button>
              </Grid>
            </Grid>
          </Paper>
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
            justify="space-between"
        >
          <FormMessageBar loading={!!props.fetching} error={props.quizError?.message}/>
          {ret}
        </Grid>

      </Container>
  );

};


export default connect(mapStateToProps, mapDispatchToProps)(QuizSession);
