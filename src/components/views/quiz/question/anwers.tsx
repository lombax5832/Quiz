import React from 'react';
import { IQuestionType, IQuestionViewProps, ISetUserAnswer } from '../interfaces';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { LETTERS } from '../../../../consts/letters';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { createStyles, Theme } from '@material-ui/core';
import AnswerSelector from './AnswerSelector';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
      },
    }),
);

const handleAnswerMulti = (setUserAnswers: ISetUserAnswer) => {
  return (value: number, currentQuestion: number, userAnswers: number[]) => {
    return () => {
      const currentIndex = userAnswers.indexOf(value);
      const newChecked = [...userAnswers];

      if (currentIndex=== -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setUserAnswers(newChecked, currentQuestion);
    };
  };
};

const handleAnswerSingle = (setUserAnswers: ISetUserAnswer) => {
  return (value: number, currentQuestion: number, userAnswers: number[]) => {
    return () => {
      /**
       * Single Answer always has only 1 element in userAnswers array
       */
      const currentAnswer = userAnswers[0];
      let newAnswer = [];

      /**
       * If answer changed then set value
       * otherwise if value is the same it means that user
       * unchecked the selected radio box, in this case
       * an empty array (newAnswer default) will be returned
       */
      if (currentAnswer!==value) {
        newAnswer.push(value);
      }

      setUserAnswers(newAnswer, currentQuestion);
    };
  };
};


const toggleFactory = (qtype: IQuestionType, setUserAnswers: ISetUserAnswer) => {

  if (qtype==='multi') {
    return handleAnswerMulti(setUserAnswers);
  } else if (qtype==='single') {
    return handleAnswerSingle(setUserAnswers);
  }
};

const AnswersView = (props: IQuestionViewProps) => {

  const classes = useStyles();

  const { setUserAnswers, currentQuestion, question } = props;
  const { answers, qtype = 'multi', userAnswers = [] } = question;

  const handleToggle = toggleFactory(qtype, setUserAnswers);

  return (
      <List className={classes.root}>
        {answers.map((value, ansID) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
              <ListItem key={`ans${ansID}`} role={undefined} dense button
                        onClick={handleToggle(ansID, currentQuestion, userAnswers)}>
                <ListItemIcon style={{}}>
                  <FormControlLabel
                      control={<AnswerSelector
                          qtype={qtype}
                          ansID={ansID}
                          labelId={labelId}
                          userAnswers={userAnswers}
                      />}
                      label={`${LETTERS[ansID]}.`}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.body}/>
              </ListItem>
          );
        })}
      </List>
  );
};

export default AnswersView;
