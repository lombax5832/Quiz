import { Box } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';
import { renderTextArea } from '../../formrenderers/materialui';
import { FORM_NAME } from './consts';
const selectFormValue = formValueSelector(FORM_NAME);

const EditAnswerExplanation = (props: { id: number, hasExplanation?: boolean }) => {

  if (props.hasExplanation) {
    return (
        <Box mt={1}>
        <Field
            name={`answers[${props.id}].explanation`}
            type="text"
            component={renderTextArea}
            label="Explanation"
        />
        </Box>
    );
  } else {
    return null;
  }

};


let mapStateToPropsExplanation = (state, ownProps: { id: number }) => {
  const fieldName = `answers[${ownProps.id}].explanation`;
  const explanation = selectFormValue(state, fieldName);
  console.log(`explanation value for ${fieldName}=${explanation}`);
  const hasExplanation = explanation!==undefined;

  return { hasExplanation };
};


export default connect(mapStateToPropsExplanation)(EditAnswerExplanation);

