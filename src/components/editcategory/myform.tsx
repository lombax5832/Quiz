import React from 'react';
import { Box, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EditTitle from './edittitle';
import EditSlug from './editslug';
import EditCategoryDescription from './editdescription';
import Button from '@material-ui/core/Button';

const MyCategoryForm = ({handleSubmit, pristine, reset, submitting}) => (
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
)
