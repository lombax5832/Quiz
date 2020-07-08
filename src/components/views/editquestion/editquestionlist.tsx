import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
  ButtonGroup,
  Divider,
} from '@material-ui/core';
import { Add, Edit, Delete } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import HttpClient from '../../../httpclient/client';
import LinearLoader from '../../loadingbar';
import QuizSelectorMenu from '../../formelements/quizselectormenu';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  h4: {
    fontSize: '150%',
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    //margin: 3,
  },
  divider: {
    marginTop: 10,
  },
});

export default function () {
  const classes = useStyles();

  const navigate = useNavigate();

  const [categories, setCategories] = useState();

  const [questions, setQuestions] = useState();

  const fetchQuestions = (quiz_id) => {
    HttpClient.get(`/questions/quiz/${quiz_id}`)
        .then(response => {
          setQuestions(response.data);
        }).catch(error => {
      console.error('Fetch Questions: ', error);
    });
  };

  useEffect(() => {
    HttpClient.get('/quizzes/with_categories')
        .then(response => {
          setCategories(response.data);
        })
        .catch(error => {
          console.error('Fetch Categories: ', error);
        });
  }, []);

  return (
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Question List
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" size="small" startIcon={<Add/>} onClick={() => {
            navigate('new');
          }}>Create New Question</Button>
          <QuizSelectorMenu
              categories={categories}
              label="Select Quiz"
              onChange={(value) => {
                console.log('Quiz selector on change: ', value._id);
                fetchQuestions(value._id);
              }}
          />
        </CardActions>

        <LinearLoader loading={!categories}/>
        {questions &&
        <>
            <Divider className={classes.divider}/>
            <List className={classes.root}>
              {(questions as Array<any>).map((value) => {
                return (
                    <ListItem key={value._id} button disableRipple>
                      <ListItemText><Typography variant="h6">{value.question}</Typography></ListItemText>
                      <ListItemSecondaryAction>
                        <ButtonGroup>
                          <Button className={classes.button} variant="outlined" startIcon={<Edit/>} color="primary"
                                  onClick={() => navigate(value._id)}>Edit</Button>
                          <Button className={classes.button} variant="outlined" startIcon={<Delete/>}
                                  color="secondary">Delete</Button>
                        </ButtonGroup>
                      </ListItemSecondaryAction>
                    </ListItem>
                );
              })}
            </List>
        </>
        }
      </Card>

  );
}
