import { Button } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import React from 'react';
import { connect } from 'react-redux';
import { arraySplice, formValueSelector } from 'redux-form';
import { FORM_NAME } from './consts';

const selectFormValue = formValueSelector(FORM_NAME);

const ToggleExplanation = (props: {
  answerId: number,
  answer?: any,
  arraySplice?: Function
}) => {

  const { arraySplice, answerId, answer } = props;
  let newAnswer = { ...answer };
  let btnText: string = 'Explanation';
  let setExplanation: Function;
  let danger;
  let BtnIcon = <Add/>;

  const hasExplanation = answer && answer.explanation!==undefined;

  console.log(`ToggleExplanation2 answerId=${answerId} answer=${JSON.stringify(answer)} hasExplanation=${hasExplanation}`);


  if (hasExplanation) {
    danger = 'danger';
    BtnIcon = <Remove/>;
    newAnswer.explanation = undefined;
  } else {
    newAnswer.explanation = '';
  }

  setExplanation = () => {
    arraySplice(FORM_NAME, 'answers', answerId, 1, newAnswer);
  };

  return (
      <Button
          size="small"
          variant="outlined"
          color="default"
          onClick={() => {
            console.log(`firing setExplanation hasExplanation=${hasExplanation}`);
            setExplanation();
          }}
          style={{ width: '100%' }}
      >
        {BtnIcon} {btnText}
      </Button>
  );

};

const mapStateToPropsToggleExplanation = (state: any, ownProps: { answerId: number }) => {
  const answers = selectFormValue(state, 'answers');
  const answer = Array.isArray(answers) && answers[ownProps.answerId];

  return { answer };
};

export default connect(mapStateToPropsToggleExplanation, { arraySplice })(ToggleExplanation);

