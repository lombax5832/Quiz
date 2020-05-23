import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
//
import { renderTextArea } from '../../formrenderers/materialui';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


let EditQuestion = (props: { dispatch?: Function }) => {
  const { dispatch } = props;
  const classes = useStyles();

  return (
      <Box mb={1}>
        <Card className={classes.root}>
          <CardContent>
            <Field
                name="question"
                type="textarea"
                component={renderTextArea}
                label="Question"
            />
          </CardContent>
        </Card>
      </Box>

  );
};


export default connect()(EditQuestion);
