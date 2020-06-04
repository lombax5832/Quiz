import React from 'react';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FormMessageBar from '../formloadingerrorbar';
import FormHeader from '../formelements/formheader';
import EditSelectMenu from '../formelements/editselectmenu';
import Edittext from '../formelements/edittext';
import Edittextarea from '../formelements/edittextarea';
import SubmitReset from '../formelements/submitreset';

const Form = ({ categories, title, loaded, handleSubmit, reset, error, submitting }) => (
    <form onSubmit={handleSubmit}>
      <Container maxWidth="md">
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="stretch"
            justify="center"
        >
          <FormMessageBar loading={!loaded || submitting} error={error}/>

          {loaded && <Grid item xs={12}>
              <FormHeader title={title}/>
              <EditSelectMenu options={categories} label="Select category" name="category"/>
              <Edittext name="title" label="Category Title" required autocomplete="off"/>
              <Edittext name="slug" label="URI slug" required autocomplete="off"/>
              <Edittext name="quiz_id" label="Quiz ID" autocomplete="off"/>
              <Edittextarea name="description" label="Quiz Description"/>
              <SubmitReset reset={reset}/>
          </Grid>
          }

        </Grid>
      </Container>
    </form>

);

export default Form;
