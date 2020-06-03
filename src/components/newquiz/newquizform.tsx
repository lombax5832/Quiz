import { Box, Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { reduxForm } from 'redux-form';
import ICategory from '../../interfaces/ICategory';
import { FORM_NEW_QUIZ } from '../../consts';
import EditCategoryDescription from './editdescription';
import EditQuizCategory from './editquizcategory';
import EditSlug from './editslug';
import EditTitle from './edittitle';
import HttpClient from '../../httpclient/client';

let CATEGORIES: ICategory[];

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
const NewQuizForm = (props: any) => {
  const { handleSubmit, reset } = props;

  const [categories, setCategories] = useState(null);

  /**
   * @todo will fetch existing categories from api.
   */
  useEffect(() => {
    HttpClient.get('/categories').then(categories => {
          console.log('setting categories', categories.data);
          setCategories(categories.data);
        },
    );
  }, []);


  if (!categories) {
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
                    New Quiz
                  </Typography>
                </Box>

                <EditQuizCategory options={categories}/>
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
  form: FORM_NEW_QUIZ,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: (data) => {
    console.log(data);
  },
  validate,
})(NewQuizForm);

