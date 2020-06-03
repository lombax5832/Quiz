import { Box, Card, CardContent, FormHelperText } from '@material-ui/core';
import React from 'react';
import { Field } from 'redux-form';
import { renderSelectField } from '../../formrenderers/materialui';
import ICategory from '../../interfaces/ICategory';

const EditQuizCategory = (props: { options: ICategory[], classes?: any }) => {
  const { options, classes } = props;
  console.log('In EditQuizCategory with options', options);
  return (
      <Box mb={1}>
        <Card>
          <CardContent>
            <Field
                classes={classes}
                name="category"
                component={renderSelectField}
                label="Category"
                required
            >
              {options.map((option, index) => (
                  <option value={option._id} key={index}>{option.title}</option>
              ))}
            </Field>
          </CardContent>
        </Card>
      </Box>
  );
};

export default EditQuizCategory;
