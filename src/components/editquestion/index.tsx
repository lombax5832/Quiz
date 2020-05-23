import React from 'react';
import { Field, FieldArray, reduxForm, change, arraySplice, formValueSelector, arrayPush } from 'redux-form';
import { connect } from 'react-redux';
import EditQuestion from './question';
import { FORM_NAME } from './consts';
import Button from '@material-ui/core/Button';
import { Box, Divider } from '@material-ui/core';
import renderAnswers from './renderanswers';
import Grid from '@material-ui/core/Grid';
import QuestionMeta from './questionmeta';
import CssBaseline from '@material-ui/core/CssBaseline';
import EditQuestionType from './questiontype';
import EditExplanation from './editexplanation';
import AddAnswer from './addanswer';
import TypeMenu from './typemenu';

let ContactForm = (props: any) => {
  const { handleSubmit, reset } = props;
  return (
      <div style={{ flexGrow: 1 }}>
        <CssBaseline/>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <QuestionMeta reset={reset}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <EditQuestion/>
              <EditExplanation/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <AddAnswer/>
              <FieldArray name="answers" component={renderAnswers}/>
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
})(ContactForm);
