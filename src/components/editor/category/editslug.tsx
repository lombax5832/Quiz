import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import { Field } from 'redux-form';
import { renderTextField } from '../../../formrenderers/materialui';

const EditSlug = (props: any) => {

  return (
      <Box mb={1}>
        <Card>
          <CardContent>
            <Field
                name="slug"
                variant="outlined"
                required
                fullWidth={true}
                component={renderTextField}
                label="URI Slug"
                style={{minWidth: 275}}
            />
          </CardContent>
        </Card>
      </Box>
  );
};

export default EditSlug;
