import React from 'react';
import { Card, createStyles, Theme } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box';
import { IQuizSessionProps, IQuizView } from './interfaces';
import ListIcon from '@material-ui/icons/List';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PercentageBar from './score/percentagebar';
import Typography from '@material-ui/core/Typography';
import { DEFAULT_PASSING_SCORE } from '../../../consts/configuration';

const TAG = 'QuizScore';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    }),
);

const QuizScore = (props: IQuizSessionProps) => {

  console.log(TAG, 'entered with props', props);

  const classes = useStyles();

  const result = props.userScore >= props.passingScore ? 'Passed':'Failed';
  const resultBarColor = result==='Passed' ? 'green':'red';

  const { passingScore = DEFAULT_PASSING_SCORE, userScore, setQuizView } = props;

  return (
      <Box mt={1}>
        <Card title="Results">
          <CardHeader title="Quiz Result"/>
          <CardContent>
            <Grid container
                  direction="column"
                  justify="flex-start"
                  alignItems="stretch"
                  spacing={1}>
              <Grid item>
                <PercentageBar val={passingScore} showLabel/>
              </Grid>
              <Grid item>
                Passing Score: {`${passingScore}`}
              </Grid>
              <Grid item>
                <PercentageBar val={userScore} fgColor={resultBarColor} showLabel/>
              </Grid>
              <Grid item>
                Your Score: {`${userScore}`}
              </Grid>
              <Grid item>
                <Typography variant="h5">Grade: {result}</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
                variant="outlined"
                color="default"
                size="medium"
                onClick={() => setQuizView(IQuizView.REVIEW)}
                startIcon={<ListIcon/>}>
              Review
            </Button>
          </CardActions>
        </Card>
      </Box>
  );
};

export default QuizScore;
