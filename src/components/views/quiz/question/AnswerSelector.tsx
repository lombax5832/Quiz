import React from 'react';
import { IQuestionType } from '../interfaces';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';

export interface IAnswerSelectorProps {
  qtype: IQuestionType
  labelId: string
  userAnswers: number[]
  ansID: number
  disabled?: boolean

}

const AnswerSelector = (props: IAnswerSelectorProps) => {

  const { qtype, userAnswers, ansID, labelId } = props;

  switch (qtype) {
    case 'multi':
      return (<Checkbox
          edge="start"
          color="default"
          checked={userAnswers.indexOf(ansID)!== -1}
          tabIndex={-1}
          disabled={!!props.disabled}
          disableRipple
          disableFocusRipple
          disableTouchRipple
          style={{ backgroundColor: 'transparent' }}
          inputProps={{ 'aria-labelledby': labelId }}
      />);

    case 'single':
      return (
          <Radio
              edge="start"
              color="default"
              checked={userAnswers.indexOf(ansID)!== -1}
              tabIndex={-1}
              disabled={!!props.disabled}
              disableRipple
              disableFocusRipple
              disableTouchRipple
              style={{ backgroundColor: 'transparent' }}
              inputProps={{ 'aria-labelledby': labelId }}
          />
      );

    default:
      return null;
  }
};

export default AnswerSelector;
