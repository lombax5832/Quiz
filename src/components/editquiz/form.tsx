import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormMessageBar from '../formloadingerrorbar';
import FormHeader from '../formelements/formheader';
import EditSelectMenu from '../formelements/editselectmenu';
import Edittext from '../formelements/edittext';
import Edittextarea from '../formelements/edittextarea';
import SubmitReset from '../formelements/submitreset';
import Button from '@material-ui/core/Button';

const Form = ({ categories, title, loaded, handleSubmit, reset, error, submitting, retry }) => (
    <form onSubmit={handleSubmit}>
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
              <EditSelectMenu options={categories} label="Select category" required name="category_id"/>
              <Edittext name="title" label="Category Title" required autocomplete="off"/>
              <Edittext name="slug" label="URI slug" required autocomplete="off"/>
              <Edittext name="quiz_id" label="Quiz ID" autocomplete="off"/>
              <Edittext type="number" name="passing_grade" label="Passing Grade" required autocomplete="off"/>
              <Edittextarea name="description" label="Quiz Description"/>
              <SubmitReset reset={reset}/>
              <div>
                  <Button
                      variant="outlined"
                      color="default"
                      onClick={retry}>
                    Retry
                  </Button>
              </div>
          </Grid>
          }

        </Grid>
    </form>

);

export default Form;
