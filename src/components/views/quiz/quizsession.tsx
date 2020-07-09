import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IQuizSessionProps } from './interfaces';
import HttpClient from '../../../httpclient/client';
import { CreateQuizDataFetched, CreateQuizDataFetchError, CreateQuizFetching } from '../../../store/actions/quiz';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FormMessageBar from '../../formloadingerrorbar';

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

  const currentQuestion = state.quiz_data?.active_question || -1
  const questionsCount = state.quiz_data?.questions?.length || 0;
  const question = currentQuestion > -1 ? state.quiz_data.questions[currentQuestion] : null
  const quizID = state.quiz_session?.quiz_id;
  const sessionID =  state.quiz_session?._id;

  return {
    sessionID,
    quizID,
    currentQuestion,
    questionsCount,
    question,
    fetching: !!state.quiz_session?.fetching,
    fetch_error: state.quiz_session?.fetch_error,
  }
}

const QuizSession = (props: IQuizSessionProps) => {
  const params = useParams();
  const { session_id } = params;
  const { dispatch } = props;
  console.log('entered QuizSession with sessionID', session_id);

  useEffect(() => {
    dispatch(fetchQuiz(session_id));
  }, [session_id]);

  let ret: React.ReactElement = <p>Under Construction</p>;

  return (
      <Container maxWidth="md">
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="stretch"
            justify="center"
        >
          <FormMessageBar loading={!!props.fetching} error={props.fetch_error?.message}/>
          {ret}
        </Grid>
      </Container>
  );

};


export default connect(mapStateToProps)(QuizSession);
