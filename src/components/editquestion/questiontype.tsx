import React from 'react';
import { connect } from 'react-redux';
import { change, Field, formValueSelector } from 'redux-form';
import { renderSelectField } from '../../formrenderers/materialui';
import { FORM_NAME } from '../consts';


const selectFormValue = formValueSelector(FORM_NAME);

let EditQuestionType = (props: { qtype?: string, dispatch?: Function }) => {

  const { qtype, dispatch } = props;

  function handleChange(ev) {
    console.log(`handleChange with value=${ev?.target?.value}`)
    dispatch(change(FORM_NAME, 'qtype', ev?.target?.value));
  }

  return (
      <Field
          component={renderSelectField}
          label="Question Type 2"
          name="qtype"
          value={qtype}
          defaultValue="multi"
          onChange={handleChange}
      >
        <option value="single">Single Correct</option>
        <option value="multi">Multiple Correct</option>
      </Field>
  );
};



const mapStateToProps = (state: any) => {
  const qtype = selectFormValue(state, 'qtype');
  console.log(`value for qtype=${qtype}`);

  return { qtype };
};

export default connect(mapStateToProps)(EditQuestionType);
