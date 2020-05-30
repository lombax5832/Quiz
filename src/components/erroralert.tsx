import React from 'react'
import Alert from '@material-ui/lab/Alert';
import { createStyles, Theme } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
    }),
);

const ErrorAlert = ({ severity, error }) => {
  const classes = useStyles();
  return (
      <div className={classes.root}>
        <Alert severity={severity}>{error}</Alert>
      </div>
  );
};

export default ErrorAlert;
