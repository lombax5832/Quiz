import React from 'react';
import { IQuestionViewProps } from '../interfaces';
import { Grid } from '@material-ui/core';
import AnswersView from './anwers';

const QuestionView = (props: IQuestionViewProps) => {

  const qBody = props.question.question;

  return (
      <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
      >
        <Grid item>
          {qBody}
        </Grid>
        <Grid item>
          <AnswersView {...props}/>
        </Grid>
      </Grid>
  );
};

export default QuestionView;
