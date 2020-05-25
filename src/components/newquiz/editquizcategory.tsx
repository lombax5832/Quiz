import { Box, Card, CardContent, FormControl, FormHelperText, InputLabel, Select } from '@material-ui/core';
import React from 'react';
import { Field } from 'redux-form';

const EditQuizCategory = (props: { options: string[], classes?: any }) => {
  const { options, classes } = props;

  const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
      return
    } else {
      return <FormHelperText>{touched && error}</FormHelperText>
    }
  }

  const renderSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
  }) => (
      <FormControl variant="outlined" fullWidth error={touched && error}>
        <InputLabel htmlFor="outlined-category-native-simple">{label}</InputLabel>
        <Select
          native
          label={label}
          {...input}
          {...custom}
          inputProps={{
            name: 'age',
            id: 'category-native-simple'
          }}
        >
          {children}
        </Select>
        {renderFromHelper({ touched, error })}
      </FormControl>
    )

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
            <option aria-label="None" value="" />
            {options.map((option, index) => (
              <option value={option}>{option}</option>
            ))}
          </Field>
        </CardContent>
      </Card>
    </Box>
  )
}

export default EditQuizCategory