import React from 'react';
import { IQuizSessionProps } from './interfaces';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardContent, CardHeader, makeStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import QuestionView from './question/question';
import Paper from '@material-ui/core/Paper';
import QuizBottomBar from './quizbottombar';


const useStyles = makeStyles({
  bottomBar: {
    display: 'block',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 1202,
    padding: '5px',
  },
  root: {
    minWidth: 275,
  },
  list: {
    width: '100%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  quizName: {
    fontSize: '100%',
  },
  pos: {
    marginBottom: 12,
  },
  divider: {
    marginTop: 10,
  },
  disabled: {
    color: '#c3bdbd',
  },
});


const QuizView = (props: IQuizSessionProps) => {
  const classes = useStyles();

  const { question, toggleMarked, currentQuestion, questionsCount, setAppBarTitle } = props;

  const cardHeader = `Question ${currentQuestion + 1} of ${questionsCount}`;
  setAppBarTitle(cardHeader);

  if (!question) return null;

  return (
      <Grid item xs={12} style={{ paddingBottom: '60px' }}>
        <Card className={classes.root}>
          <CardHeader title={cardHeader}
                      style={{ textAlign: 'center' }}
                      action={
                        <FormControlLabel
                            value="start"
                            control={<Checkbox
                                disableRipple
                                checked={!!question.isMarked}
                                onChange={(event) => toggleMarked(currentQuestion)}
                                style={{ background: 'transparent' }}
                                color="default"
                            />}
                            label="Mark"
                            labelPlacement="start"
                        />
                      }/>
          <CardContent>
            <div style={{ display: 'block', marginTop: '10px' }}>
              <QuestionView {...props} />
            </div>
          </CardContent>
        </Card>
        <Paper className={classes.bottomBar}>
          <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
          >
            <Grid item>
              <QuizBottomBar {...props} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
  );
};

export default QuizView;
