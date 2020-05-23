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
import ToggleExplanation from './toggleexplanationbutton';
import EditAnswerExplanation from './editanswerexplanation';
import Divider from '@material-ui/core/Divider';

const renderAnswers = (props) => {
  const { fields, meta: { error, submitFailed } } = props;
  return fields.map((answer, index) => {

        console.log('answer=', JSON.stringify(answer));

        return (
            <Box mb={1} key={`answer-${index}`}>
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
                      <Field name={`${answer}.isCorrect`} component={renderCheckbox} label="Correct"/>
                    </Grid>
                    <Grid item>
                      <ToggleExplanation answerId={index}/>
                    </Grid>
                    <Grid item>
                      <IconButton
                          aria-label="delete"
                          onClick={() => fields.remove(index)}>
                        <DeleteIcon/>
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardActions>
                <CardContent>
                  <Field
                      name={`${answer}.body`}
                      type="textarea"
                      component={renderTextArea}
                      label={`Answer ${index + 1}`}
                  />
                  <EditAnswerExplanation id={index}/>
                </CardContent>
              </Card>
            </Box>
        );
      },
  );

};

export default renderAnswers;
