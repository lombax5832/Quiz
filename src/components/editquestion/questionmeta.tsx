import { Card, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { ICategoryWithQuizzes } from '../../interfaces/ICategory';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IQuiz from '../../interfaces/IQuiz';
import categoryform from '../editcategory/categoryform';


const QuestionMeta = (props: { reset: Function, quizzes: Array<ICategoryWithQuizzes> }) => {

  interface IQuizWithCategory extends IQuiz {
    categoryName: string
  }

  const [value, setValue] = React.useState<IQuizWithCategory | null>(null);

  const categories = props.quizzes.map((category) => {
    const quizzes = category.quizzes.map((quiz) => {
      return {
        ...quiz,
        categoryName: category.title
      }
    })
    return quizzes;

  }).flat();

  console.log("Categories: ", categories)

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
                id="grouped-demo"
                options={categories}
                groupBy={(option) => option.categoryName}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                disableClearable
                renderInput={(params) => <TextField {...params} label="Quiz" variant="outlined" />}
                getOptionSelected={(option, value) => option._id === value._id}
                value={value}
                onChange={(event: any, newValue: IQuizWithCategory | null) => {
                  setValue(newValue)
                  console.log("Autocomplete", value)
                }}
              />
            </Grid>
          }
          <Grid item>
            <Button
              variant="outlined"
              color="default"
              onClick={() => props.reset()}>
              Reset Values
              </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" type="submit" color="primary">
              Submit
              </Button>
          </Grid>
        </Grid>
      </CardActions>

    </Card>
  );
};


export default QuestionMeta;
