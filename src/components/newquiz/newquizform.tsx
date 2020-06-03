import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import React, { useEffect, useState } from 'react';
import { reduxForm } from 'redux-form';
import ICategory from '../../interfaces/ICategory';
import { FORM_NEW_QUIZ } from '../../consts';
import HttpClient from '../../httpclient/client';
import Edittext from '../formelements/edittext';
import Edittextarea from '../formelements/edittextarea';
import EditSelectMenu from '../formelements/editselectmenu';
import SubmitReset from '../formelements/submitreset';
import FormHeader from '../formelements/formheader';

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
 * pre-load all existing categories from server.
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
                <FormHeader title="New Quiz"/>
                <EditSelectMenu options={categories} label="Select category" name="category"/>
                <Edittext name="title" label="Category Title" required={true} autocomplete="off"/>
                <Edittext name="slug" label="URI slug" required={true} autocomplete="off"/>
                <Edittext name="quiz_id" label="Quiz ID" required={false} autocomplete="off"/>
                <Edittextarea name="description" label="Quiz Description"/>
                <SubmitReset reset={reset}/>
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

