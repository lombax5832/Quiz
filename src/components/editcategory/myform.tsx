import React from 'react';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Edittext from '../formelements/edittext';
import FormMessageBar from '../formloadingerrorbar';
import Edittextarea from '../formelements/edittextarea';
import SubmitReset from '../formelements/submitreset';
import FormHeader from '../formelements/formheader';

const MyCategoryForm = ({ title, loaded, handleSubmit, pristine, reset, error, submitting }) => (
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
              <Edittext name="title" label="Category Title" required={true} autocomplete="off"/>
              <Edittext name="slug" label="URI slug" required={true} autocomplete="off"/>
              <Edittextarea name="description" label="Category Description"/>
              <SubmitReset reset={reset} />
          </Grid>
          }


        </Grid>
      </Container>
    </form>
);

export default MyCategoryForm;
