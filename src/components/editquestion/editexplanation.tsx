import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import { Field } from 'redux-form';
import { renderTextArea } from '../../formrenderers/materialui';
import CardActions from '@material-ui/core/CardActions';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { Box } from '@material-ui/core';


const EditExplanation = (props) => {

  return (
      <Box mb={1}>
        <Card>
          <CardContent>
            <Field
                name="explanation"
                type="textarea"
                component={renderTextArea}
                label="Explanation"
            />
          </CardContent>
        </Card>
      </Box>
  );
};

export default EditExplanation;
