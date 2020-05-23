import React from 'react';
import { Field, change, formValueSelector} from 'redux-form';
import { connect } from 'react-redux';
import { FORM_NAME } from './consts';
import { renderSelectField } from '../../formrenderers/materialui';


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
          label="Question Type"
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
