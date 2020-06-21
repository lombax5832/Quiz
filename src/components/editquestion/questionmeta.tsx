import { Card } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { ICategoryWithQuizzes } from '../../interfaces/ICategory';
import { IQuizWithCategory } from '../../interfaces/IQuiz';
import SubmitReset from '../formelements/submitreset';
import { FORM_NAME } from '../../consts';
import { change, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import QuizSelectorMenu from '../formelements/quizselectormenu';

const FORM_FIELD_QUIZ_ID = 'quiz_id';

const selectFormValue = formValueSelector(FORM_NAME);

const mapStateToProps = (state) => {
  let quiz_id = selectFormValue(state, FORM_FIELD_QUIZ_ID);

  return { quiz_id };
};

const QuestionMeta = (props: { dispatch: Function, reset: Function, categories: Array<IQuizWithCategory>, quiz_id?: string }) => {

  const { reset, quiz_id, categories, dispatch } = props;

  console.log('Categories: ', categories);

  return (
      <Card>
        <CardActions>
          <Grid
              container
              spacing={2}
              direction="row"
              justify="space-evenly"
              alignItems="stretch"
          >
            <Grid item xs={6}>
              <QuizSelectorMenu
                  categories={categories}
                  label="Select Quiz"
                  quiz_id={quiz_id}
                  onChange={(value) => {
                    dispatch(change(FORM_NAME, FORM_FIELD_QUIZ_ID, value._id));
                  }}
              />
            </Grid>
            <Grid item xs={6}>
              <Grid
                  container
                  spacing={2}
                  direction="row"
                  justify="flex-end"
                  alignItems="stretch"
              >

                <Grid item>
                  <SubmitReset reset={reset} btnResetLabel="Reset Form"/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardActions>

      </Card>
  );
};


export default connect(mapStateToProps)(QuestionMeta);
