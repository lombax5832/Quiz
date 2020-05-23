import React from 'react';
import { Field } from 'redux-form';
import { renderCheckbox, renderTextArea } from '../../formrenderers/materialui';
import { AddCircle, DeleteOutlined } from '@material-ui/icons';
import { Box, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import { spacing } from '@material-ui/system';

const renderAnswers = (props) => {
  const { fields, meta: { error, submitFailed } } = props;
  return fields.map((answer, index) => {

        console.log('answer=', JSON.stringify(answer));

        return (
            <Box mb={1}>
              <Card key={`answer-${index}`}>
                <CardContent>
                  <Field
                      name={`${answer}.body`}
                      type="textarea"
                      component={renderTextArea}
                      label={`Answer ${index + 1}`}
                  />
                </CardContent>
                <CardActions>
                  <Grid
                      container
                      spacing={2}
                      direction="row"
                      justify="flex-end"
                      alignItems="center"
                  >
                    <Grid item>
                      <Field name={`${answer}.isCorrect`} component={renderCheckbox} label="Correct"/>
                    </Grid>
                    <Grid item>
                      <Button
                          size="small"
                          variant="outlined"
                          color="default"
                          startIcon={<AddCircle/>}
                      >
                        Explanation
                      </Button>
                    </Grid>
                    <Grid item>
                      <IconButton aria-label="delete">
                        <DeleteIcon/>
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Box>
        );
      },
  );

};

export default renderAnswers;
