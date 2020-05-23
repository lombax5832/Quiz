import React from 'react';
import { Box, Card, Paper } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import EditQuestionType from './questiontype';
import AddAnswer from './addanswer';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { AddCircle } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import TypeMenu from './typemenu'
import { Field } from 'redux-form';
import { renderSelectField } from '../../formrenderers/materialui';


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
