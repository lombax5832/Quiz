import { Box, Card, CardContent } from '@material-ui/core';
import React from 'react';
import { Field } from 'redux-form';
import { renderSelectField } from '../../formrenderers/materialui';

export interface ISelectOptions {
  _id: string
  title: string
}
export interface ISelectMenuProps {
  label: string
  name: string
  classes?: any
  required?: boolean
  options: ISelectOptions[]
}

const EditSelectMenu = (props: ISelectMenuProps) => {

  const options = props.options || [];

  return (
      <Box mb={1}>
        <Card>
          <CardContent>
            <Field
                classes={props.classes}
                name={props.name}
                component={renderSelectField}
                label={props.label}
                required={!!props.required}
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

export default EditSelectMenu;
