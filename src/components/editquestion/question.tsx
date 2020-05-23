import Redux from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box, Divider, TextareaAutosize } from '@material-ui/core';
import { Field, FieldArray, reduxForm, change, arraySplice, formValueSelector, arrayPush } from 'redux-form';
import { connect } from 'react-redux';
import React from 'react';
import { Autocomplete } from '@material-ui/lab';

//
import { renderTextArea, renderTextField } from '../../formrenderers/materialui';
import EditQuestionType from './questiontype';
import AddAnswer from './addanswer';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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
