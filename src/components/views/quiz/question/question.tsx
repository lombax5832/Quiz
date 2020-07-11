import React from 'react';
import { IQuestionViewProps } from '../interfaces';
import { createStyles, Grid, Theme } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
      },
    }),
);

const QuestionView = (props: IQuestionViewProps) => {
  const classes = useStyles();

  const qBody = props.question.question;
  const answers = props.question.answers;
  const userAnswers = props.question.userAnswers || [];
  const {setUserAnswers, currentQuestion} = props;

  const handleToggle = (value: number) => () => {
    const currentIndex = userAnswers.indexOf(value);
    const newChecked = [...userAnswers];

    if (currentIndex=== -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setUserAnswers(newChecked, currentQuestion);
  };



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
          <List className={classes.root}>
            {answers.map((value, ansID) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                  <ListItem key={`ans${ansID}`} role={undefined} dense button onClick={handleToggle(ansID)}>
                    <ListItemIcon style={{}}>
                      <FormControlLabel
                          control={<Checkbox
                              edge="start"
                              color="default"
                              checked={userAnswers.indexOf(ansID)!== -1}
                              tabIndex={-1}
                              disableRipple
                              disableFocusRipple
                              disableTouchRipple
                              style={{ backgroundColor: 'transparent' }}
                              inputProps={{ 'aria-labelledby': labelId }}
                          />}
                          label={`${LETTERS[ansID]}.`}
                      />

                    </ListItemIcon>
                    <ListItemText id={labelId} primary={value.body}/>
                  </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
  );
};

export default QuestionView;
