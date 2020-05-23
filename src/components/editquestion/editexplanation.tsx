import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import { Field } from 'redux-form';
import { renderTextArea } from '../../formrenderers/materialui';


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
