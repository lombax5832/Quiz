import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IQuizSessionProps } from './interfaces';
import HttpClient from '../../../httpclient/client';
import { CreateQuizDataFetched, CreateQuizDataFetchError, CreateQuizFetching } from '../../../store/actions/quiz';
import { connect } from 'react-redux';

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


  return <p>Under Construction</p>;

};


export default connect()(QuizSession);
