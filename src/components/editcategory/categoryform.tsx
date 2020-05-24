import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { FORM_NAME } from '../consts';
import { Field, reduxForm } from 'redux-form';
import QuestionMeta from '../editquestion/questionmeta';
import EditQuestion from '../editquestion/question';
import EditExplanation from '../editquestion/editexplanation';
import EditTitle from './edittitle';
import EditSlug from './editslug';
import Button from '@material-ui/core/Button';
import { Box, Container } from '@material-ui/core';
import EditCategoryDescription from './editdescription';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

let CATEGORIES;

const validate = values => {

  const errors = { slug: undefined };

  const slugExists = Array.isArray(CATEGORIES) && CATEGORIES.find(categ => categ.slug===values.slug);

  if (slugExists) {
    errors.slug = 'Category with same URI slug already exists';

    return errors;
  }
};


/**
 * @todo pre-load all existing categories from server.
 * Validate title and slug so that it is unique - when adding
 * new category slug and title must not already exist.
 *
 * @param props
 * @constructor
 */
const CategoryForm = (props: any) => {
  const { handleSubmit, reset } = props;

  const [loaded, setLoaded] = useState(null);

  /**
   * @todo will fetch existing categories from api.
   */
  useEffect(() => {
    setTimeout(function () {

      CATEGORIES = [
        {
          title: 'Google',
          slug: 'google',
          _id: 'abc',
        },
        {
          title: 'IBM',
          slug: 'ibm',
          _id: 'abcd',
        },
      ];
      setLoaded(true);
    }, 600);
  }, []);


  if (!loaded) {
    return (
        <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justify="center"
        >
          <Grid item style={{ width: '100%' }}>
            <LinearProgress variant="query"/>
          </Grid>
        </Grid>
    );
  } else {


    return (
        <form onSubmit={handleSubmit}>
          <Container maxWidth="md">
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="stretch"
                justify="center"
            >
              <Grid item xs={12}>
                <Box mb={1}>
                  <Typography variant="h2">
                    Edit Category
                  </Typography>
                </Box>
                <EditTitle/>
                <EditSlug/>
                <EditCategoryDescription/>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                >

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
              </Grid>


            </Grid>
          </Container>
        </form>
    );
  }
};


export default reduxForm({
  form: FORM_NAME,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: (data) => {
    console.log(data);
  },
  validate,
})(CategoryForm);

