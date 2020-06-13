import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormMessageBar from '../formloadingerrorbar';
import QuestionMeta from './questionmeta';
import Edittextarea from '../formelements/edittextarea';
import AddAnswer from './addanswer';
import { FieldArray } from 'redux-form';
import renderAnswers from './renderanswers';
import Button from '@material-ui/core/Button';

const Form = ({ quizzes, title, loaded, handleSubmit, reset, error, submitting, retry }) => (
    <form onSubmit={handleSubmit}>
      <Grid
          container
          spacing={0}
          direction="column"
          alignItems="stretch"
          justify="center"
      >

        <FormMessageBar loading={!loaded || submitting} error={error}/>

        {loaded &&  <Grid container spacing={1}>
          <Grid item xs={12}>
            <QuestionMeta reset={reset} quizzes={quizzes} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Edittextarea name="question" label="Question"/>
            <Edittextarea name="explanation" label="Explanation"/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <AddAnswer qtype=''/>
            <FieldArray name="answers" component={renderAnswers} />
          </Grid>
            <div>
                <Button
                    variant="outlined"
                    color="default"
                    onClick={retry}>
                    Retry
                </Button>
            </div>
        </Grid> }
      </Grid>
    </form>
)

export default Form;
