import { Card, TextField } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { ICategoryWithQuizzes } from '../../interfaces/ICategory';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IQuiz from '../../interfaces/IQuiz';
import SubmitReset from '../formelements/submitreset';
import { FORM_NAME } from '../../consts';
import { change, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

const FORM_FIELD_QUIZ_ID = 'quiz_id';

const selectFormValue = formValueSelector(FORM_NAME);

const mapStateToProps = (state, ownProps) => {
  let quiz_id = selectFormValue(state, FORM_FIELD_QUIZ_ID);

  return {quiz_id}
}

const QuestionMeta = (props: { dispatch: Function, reset: Function, quizzes: Array<ICategoryWithQuizzes>, quiz_id?: string }) => {

  const {reset, quiz_id, quizzes, dispatch } = props;
  let value: IQuizWithCategory;
  interface IQuizWithCategory extends IQuiz {
    categoryName: string
  }

  const categories: Array<IQuizWithCategory> = quizzes.map((category) => {
    const quizzes = category.quizzes.map((quiz) => {
      return {
        ...quiz,
        categoryName: category.title
      }
    })
    return quizzes;

  }).flat();

  console.log("Categories: ", categories);

  if(quiz_id){
    const matches = categories.filter(quiz => quiz._id);
    value = matches && matches[0]
  }

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
          {
            <Grid item>
              <Autocomplete
                id="quiz_id_selector"
                options={categories}
                groupBy={(option) => option.categoryName}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                disableClearable
                renderInput={(params) => <TextField {...params} label="Quiz" variant="outlined" />}
                getOptionSelected={(option, value) => option._id === value._id}
                value={value}
                onChange={(event: any, newValue: IQuizWithCategory | null) => {
                  dispatch(change(FORM_NAME, FORM_FIELD_QUIZ_ID, newValue._id))
                }}
              />
            </Grid>
          }
          <Grid item>
            <SubmitReset reset={reset} btnResetLabel="Reset Form"/>
          </Grid>
        </Grid>
      </CardActions>

    </Card>
  );
};


export default connect(mapStateToProps)(QuestionMeta);
