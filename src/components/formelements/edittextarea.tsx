import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import { Field } from 'redux-form';
//
import { renderTextArea } from '../../formrenderers/materialui';

export interface IEditTextArea {
  name: string
  label: string
}

const Edittextarea = (props: IEditTextArea) => {

  return (
      <Box mb={1}>
        <Card>
          <CardContent>
            <Field
                name={props.name}
                type="textarea"
                component={renderTextArea}
                label={props.label}
            />
          </CardContent>
        </Card>
      </Box>

  );
};


export default Edittextarea;
