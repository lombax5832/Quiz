import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { FieldArray, reduxForm } from 'redux-form';
import AddAnswer from './addanswer';
import { FORM_NAME } from '../../consts';
import EditExplanation from './editexplanation';
import EditQuestion from './question';
import QuestionMeta from './questionmeta';
import renderAnswers from './renderanswers';
import EnsureLogin from '../ensurelogin'

let QuestionForm = (props: any) => {
  const { handleSubmit, reset } = props;
  return (
    <EnsureLogin isRequired>
      <div style={{ flexGrow: 1 }}>
        <CssBaseline />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <QuestionMeta reset={reset} />
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
    </EnsureLogin>
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
