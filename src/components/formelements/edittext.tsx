import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import { Field } from 'redux-form';
//
import { renderTextField } from '../../formrenderers/materialui';

export interface IEditTextProps {
  required?: boolean
  autocomplete?: string
  name: string
  label: string
  type?: 'text' | 'number'
  error?: boolean
}

const Edittext = (props: IEditTextProps) => {

  const {autocomplete, required, name, label, type, error} = props

  return (
      <Box mb={1}>
        <Card>
          <CardContent>
            <Field
                name={name}
                variant="outlined"
                required={!!required}
                fullWidth={true}
                autocomplete={autocomplete}
                component={renderTextField}
                label={label}
                style={{minWidth: 275}}
                type={type}
                error={error}
            />
          </CardContent>
        </Card>
      </Box>
  );
};

export default Edittext;

