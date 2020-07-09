import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IQuizSessionProps } from './interfaces';
import HttpClient from '../../../httpclient/client';
import {
  CreateQuizDataFetched,
  CreateSetActiveQuestion,
  CreateQuizDataFetchError,
  CreateQuizFetching,
} from '../../../store/actions/quiz';
import { connect } from 'react-redux';
import { Button, CardContent, CardHeader, Container, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FormMessageBar from '../../formloadingerrorbar';
import ErrorTile from '../../errortile';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';


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


const fetchQuiz = (id: string) => {

  return dispatch => {
    dispatch(CreateQuizFetching());
    HttpClient.get(`/quizsession/${id}`).then(response => {
      dispatch(CreateQuizDataFetched(response.data));
    }).catch(e => {
      dispatch(CreateQuizDataFetchError(e));
    });
  };
};

const mapStateToProps = (state, ownProps) => {

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

const mapDispatchToProps = (dispatch: Function, ownProps) => {

  return {
    setActiveQuestion: (id: number) => dispatch(CreateSetActiveQuestion(id)),
    fetchQuiz: (id: string) => {
      dispatch(CreateQuizFetching());
      HttpClient.get(`/quizsession/${id}`).then(response => {
        dispatch(CreateQuizDataFetched(response.data));
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
  const { fetchQuiz, setActiveQuestion, currentQuestion, questionsCount } = props;
  console.log('entered QuizSession with sessionID', session_id);

  useEffect(() => {
    fetchQuiz(session_id);
  }, [session_id]);

  let ret: React.ReactElement = <p>Under Construction</p>;

  if (props.fetchError) {
    ret = <ErrorTile message={props.fetchError.message} errorTitle="Error"
                     btnRetry={{ label: 'Retry', onClick: () => fetchQuiz(session_id) }}/>;
  } else if (props.question) {
    const cardHeader = `Question ${currentQuestion + 1} of ${questionsCount}`;
    ret = <Grid item xs={12}>
      <Card className={classes.root}>
        <CardHeader title={cardHeader}/>
        <CardContent>
          <Typography variant="h6">{props.question.question}</Typography>
          <div style={{ display: 'block', marginTop: '10px' }}>
            {JSON.stringify(props.question.answers)}
          </div>
        </CardContent>
        <CardActions>
          <Button variant="contained"
                  size="medium"
                  startIcon={<Icon>navigate_before</Icon>}
                  disabled={currentQuestion < 1}
                  onClick={() => {
                    setActiveQuestion(currentQuestion - 1);
                  }}>Previous</Button>
          <Button variant="contained"
                  size="medium"
                  endIcon={<Icon>navigate_next</Icon>}
                  disabled={(props.currentQuestion + 1) >= props.questionsCount} onClick={() => {
            setActiveQuestion(currentQuestion + 1);
          }}>Next</Button>
        </CardActions>
      </Card>
    </Grid>;
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
          <FormMessageBar loading={!!props.fetching} error={props.quizError?.message}/>
          {ret}
        </Grid>
      </Container>
  );

};


export default connect(mapStateToProps, mapDispatchToProps)(QuizSession);
