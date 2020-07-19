import React from 'react';
import { Card, createStyles, Theme } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box';
import { IQuizSessionProps } from './interfaces';
import ListIcon from '@material-ui/icons/List';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PercentageBar from './score/percentagebar';
import Typography from '@material-ui/core/Typography';

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

  const classes = useStyles();

  const result = props.userScore >= props.passingScore ? 'Passed' : 'Failed';
  const resultBarColor = result === 'Passed' ? 'green' : 'red';

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
                <PercentageBar val={props.passingScore} showLabel/>
              </Grid>
              <Grid item>
                Passing Score: {props.passingScore}
              </Grid>
              <Grid item>
                <PercentageBar val={props.userScore} fgColor={resultBarColor} showLabel/>
              </Grid>
              <Grid item>
                Your Score: {props.userScore}
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
                onClick={() => console.log('Review Clicked')}
                startIcon={<ListIcon/>}>
              Review
            </Button>
          </CardActions>
        </Card>
      </Box>
  );
};

export default QuizScore;
