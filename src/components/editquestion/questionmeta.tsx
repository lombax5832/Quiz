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

const mapStateToProps = (state, ownProps) => {
  let quiz_id = selectFormValue(state, FORM_FIELD_QUIZ_ID);

  return { quiz_id };
};

const QuestionMeta = (props: { dispatch: Function, reset: Function, quizzes: Array<ICategoryWithQuizzes>, quiz_id?: string }) => {

  const { reset, quiz_id, quizzes, dispatch } = props;

  const categories: Array<IQuizWithCategory> = quizzes.map((category) => {
    const quizzes = category.quizzes.map((quiz) => {
      return {
        ...quiz,
        categoryName: category.title,
      };
    });
    return quizzes;

  }).flat();

  console.log('Categories: ', categories);

  return (
      <Card>
        <CardActions>
          <Grid
              container
              spacing={2}
              direction="row"
              justify="flex-end"
              alignItems="stretch"
          >
            <Grid item>
              <QuizSelectorMenu
                  categories={categories}
                  label="Select Quiz"
                  quiz_id={quiz_id}
                  onChange={(value) => {
                    dispatch(change(FORM_NAME, FORM_FIELD_QUIZ_ID, value._id));
                  }}
              />
            </Grid>

            <Grid item>
              <SubmitReset reset={reset} btnResetLabel="Reset Form"/>
            </Grid>
          </Grid>
        </CardActions>

      </Card>
  );
};


export default connect(mapStateToProps)(QuestionMeta);
