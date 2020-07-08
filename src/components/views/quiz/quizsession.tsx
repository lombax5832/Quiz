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


export default connect()(QuizSession);
