import { Card } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import React from 'react';


const QuestionMeta = (props: {reset: Function}) => {

  return (
      <Card>
        <CardActions>
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
        </CardActions>

      </Card>
  );
};


export default QuestionMeta;
