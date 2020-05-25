import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import { Field } from 'redux-form';
//
import { renderTextField } from '../../formrenderers/materialui';

const EditTitle = (props: any) => {

  return (
      <Box mb={1}>
        <Card>
          <CardContent>
            <Field
                name="title"
                variant="outlined"
                required
                fullWidth={true}
                autocomplete="off"
                component={renderTextField}
                label="Category Title"
                style={{minWidth: 275}}
            />
          </CardContent>
        </Card>
      </Box>
  );
};

export default EditTitle;

