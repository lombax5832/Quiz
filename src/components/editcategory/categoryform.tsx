import { Box, Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { reduxForm, initialize } from 'redux-form';
import { FORM_EDIT_CATEGORY } from '../../consts';
import EditCategoryDescription from './editdescription';
import EditSlug from './editslug';
import EditTitle from './edittitle';
import { connect } from 'react-redux';

let CATEGORIES;

const validate = values => {

  const errors = { slug: undefined };

  const slugExists = Array.isArray(CATEGORIES) && CATEGORIES.find(categ => categ.slug===values.slug);

  if (slugExists) {
    errors.slug = 'Category with same URI slug already exists';

    return errors;
  }
};

const fetchCategory = (id: string) => {
  return new Promise(resolve => {
    setTimeout(function () {
      resolve({
        title: 'Google',
        slug: 'google',
        _id: 'abc',
      });
    }, 600);
  });
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
  const { handleSubmit, pristine, reset, submitting, initialize } = props;

  const [loaded, setLoaded] = useState(null);

  /**
   * @todo will fetch existing categories from api.
   */
  useEffect(() => {
    fetchCategory('').then(category => {
      initialize(FORM_EDIT_CATEGORY, category);
      setLoaded(true);
    });

  }, []);


  if (!loaded) {
    return (
        <LinearProgress/>
    );
  } else {

    const submitHandler = handleSubmit(e => console.log('your form detail here', e));

    return (
        <form onSubmit={submitHandler}>
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
                        onClick={() => reset()}>
                      Reset Values
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button disabled={pristine || submitting} variant="outlined" type="submit" color="primary">
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

const ConnectedForm = connect(null, { initialize })(CategoryForm);


export default reduxForm({
  form: FORM_EDIT_CATEGORY,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  //validate,
})(ConnectedForm);

