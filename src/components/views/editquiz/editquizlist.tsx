import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
  withStyles,
} from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import { Delete, Edit, ExpandMore } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HttpClient from '../../../httpclient/client';
import LinearLoader from '../../loadingbar';

const useStyles = makeStyles({
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
});

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

export default function () {
  const classes = useStyles();

  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState();

  useEffect(() => {
    HttpClient.get('/categories/with_quizzes')
        .then(response => {
          setQuizzes(response.data);
        })
        .catch(error => {
          console.error('Fetch Quizzes: ', error);
        });
  }, []);

  return (
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Quiz List
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" size="small" onClick={() => {
            navigate('new');
          }}>Create New Quiz</Button>
        </CardActions>
        <LinearLoader loading={!quizzes}/>
        {quizzes &&
        (quizzes as Array<any>).map((value) => {
          return (
              <ExpansionPanel key={value._id}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore/>}
                >
                  <Typography variant="h6">{value.title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <List className={classes.list} key={value._id}>
                    {(value.quizzes as Array<any>).map((quiz) => {
                      return (
                          <ListItem key={quiz._id} button disableRipple>
                            <ListItemText><Typography variant="body1">{quiz.title}</Typography></ListItemText>
                            <ListItemSecondaryAction>
                              <ButtonGroup>
                                <Button variant="outlined" startIcon={<Edit/>} color="primary"
                                        onClick={() => navigate(quiz._id)}>Edit</Button>
                                <Button variant="outlined" startIcon={<Delete/>} color="secondary">Delete</Button>
                              </ButtonGroup>
                            </ListItemSecondaryAction>
                          </ListItem>
                      );
                    })}
                  </List>
                </ExpansionPanelDetails>
              </ExpansionPanel>
          );
        })

        }
      </Card>
  );
}
