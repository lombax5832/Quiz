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
import ReactMarkdown from 'react-markdown';
import useTheme from '@material-ui/core/styles/useTheme';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '100%',
        marginBottom: '2px',
        backgroundColor: theme.palette.background.paper,
        '&$disabled': {
          color: theme.palette.text.primary,
        },
      },
      bgIncorrect: {
        backgroundColor: theme.palette.error.light,
      },
      bgCorrect: {
        backgroundColor: theme.palette.success.light,
      },
      disabled: { opacity: 1, color: theme.palette.text.primary },
      answer: {
        color: theme.palette.text.primary,
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
  const theme = useTheme();

  const { setUserAnswers, currentQuestion, question, finishTime } = props;
  const { showAnswer, answers, qtype = 'multi', userAnswers = [] } = question;

  const handleToggle = toggleFactory(qtype, setUserAnswers);

  return (
      <List className={classes.root}>
        {answers.map((value, ansID) => {
          const labelId = `checkbox-list-label-${ansID}`;
          let bgColor = theme.palette.background.paper;
          if (!!finishTime || showAnswer) {
            if (value.isCorrect) {
              bgColor = theme.palette.success.light;
            } else if (userAnswers.findIndex(ansKey => ansKey===ansID) > -1) {
              bgColor = theme.palette.error.light;
            }
          }
          return (
              <ListItem key={`ans${ansID}`}
                        role={undefined}
                        dense
                        button
                        style={{ backgroundColor: bgColor }}
                        disabled={!!finishTime}
                        classes={{
                          root: classes.root, // class name, e.g. `root-x`
                          disabled: classes.disabled, // class name, e.g. `disabled-x`
                        }}
                        onClick={handleToggle(ansID, currentQuestion, userAnswers)}>
                <ListItemIcon style={{}}>
                  <FormControlLabel
                      control={<AnswerSelector
                          qtype={qtype}
                          ansID={ansID}
                          labelId={labelId}
                          disabled={!!finishTime}
                          userAnswers={userAnswers}
                      />}
                      label={`${LETTERS[ansID]}.`}
                  />
                </ListItemIcon>
                <ListItemText
                    id={labelId}
                    disableTypography
                    className={classes.answer}>
                  <ReactMarkdown>
                    {value.body}
                  </ReactMarkdown>
                </ListItemText>
              </ListItem>
          );
        })}
      </List>
  );
};

export default AnswersView;
