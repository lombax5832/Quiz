import React from 'react';
import { BottomNavigation, BottomNavigationAction, createStyles, Theme } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { IQuizSessionProps, IQuizView } from './interfaces';
import makeStyles from '@material-ui/core/styles/makeStyles';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        color: "#000"
      },
      paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    }),
);

const QuizBottomBar = (props: IQuizSessionProps) => {

  const classes = useStyles();

  const {
    sessionID,
    setActiveQuestion,
    currentQuestion,
    questionsCount,
    toggleShowAnswer,
    gradeQuiz,
    finishTime,
    setQuizView,
  } = props;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    console.log('Handle change value: ', newValue);
    switch (newValue) {
      case 'previous':
        setActiveQuestion(currentQuestion - 1);
        break;
      case 'next':
        setActiveQuestion(currentQuestion + 1);
        break;

      case 'end':
        gradeQuiz(sessionID);
        break;

      case 'show_answer':
        toggleShowAnswer();
        break;

      case 'review':
        setQuizView(IQuizView.REVIEW);
        break;
      default:
        break;
    }
  };


  return (
      <BottomNavigation onChange={handleChange} showLabels className={classes.root}
                        value={props.question?.showAnswer ? 'show_answer':''}>
        <BottomNavigationAction label="Previous" value="previous" disabled={currentQuestion < 1}
                                icon={<Icon>navigate_before</Icon>}/>
        <BottomNavigationAction label={<span><u>N</u>ext</span>}
                                value="next"
                                disabled={currentQuestion + 1 >= questionsCount}
                                className={classes.root}
                                icon={<Icon>navigate_next</Icon>}/>
        {props.quizType==='practice' && !finishTime && <BottomNavigationAction label={<span>Check</span>} value="show_answer"
                                                                icon={<Icon>assignment_turned_in</Icon>}/>}
        <BottomNavigationAction label={<span><u>R</u>eview</span>} value="review"
                                icon={<Icon>list</Icon>}/>
        <BottomNavigationAction label="End" value="end" icon={<Icon>grading</Icon>}/>
      </BottomNavigation>
  )
}

export default QuizBottomBar;
