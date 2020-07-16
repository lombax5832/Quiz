import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IQuizSessionProps, IQuizView } from './interfaces';
import HttpClient from '../../../httpclient/client';


import {
  CreateCalculateScore,
  CreateQuizDataFetched,
  CreateQuizDataFetchError,
  CreateQuizFetching,
  CreateQuizView,
  CreateSetActiveQuestion,
  CreateToggleMarked,
  CreateUserAnswers,
} from '../../../store/actions/quiz';
import { connect } from 'react-redux';
import {
  BottomNavigation,
  BottomNavigationAction,
  CardContent,
  CardHeader,
  Container,
  makeStyles,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FormMessageBar from '../../formloadingerrorbar';
import ErrorTile from '../../errortile';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import { ClearAppBarTitle, CreateAppBarTitle } from '../../../store/actions/appbar';
import QuestionView from './question/question';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


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


const mapStateToProps = (state) => {

  const currentQuestion = state.quiz_session?.quiz_data?.active_question;
  const questionsCount = state.quiz_session?.quiz_data?.questions?.length || 0;
  const question = currentQuestion!==undefined ? state.quiz_session?.quiz_data?.questions?.[currentQuestion]:null;
  const quizID = state.quiz_session?.quiz_session?.quiz_id;
  const sessionID = state.quiz_session?.quiz_session?._id;
  const fetchError = state.quiz_session?.fetch_error;
  const fetching = !!state.quiz_session?.fetching;
  //const isMarked = question?.isMarked || ''
  const viewID = state.quiz_session?.quiz_data?.quiz_view || IQuizView.QUIZ;

  return {
    sessionID,
    quizID,
    currentQuestion,
    questionsCount,
    question,
    fetching,
    fetchError,
    viewID,
  };

};

const mapDispatchToProps = (dispatch: Function) => {

  return {
    dispatch,
    setActiveQuestion: (id: number) => dispatch(CreateSetActiveQuestion(id)),
    setUserAnswers: (userAnswers: number[], currentQuestion: number) => dispatch(CreateUserAnswers(userAnswers, currentQuestion)),
    setAppBarTitle: (title: string) => dispatch(CreateAppBarTitle(title)),
    toggleMarked: (currentQuestion: number) => {
      dispatch(CreateToggleMarked(currentQuestion));
    },
    gradeQuiz: (sessID: string) => {
      dispatch(CreateCalculateScore(sessID));
    },
    setQuizView: (viewID: IQuizView) => {
      dispatch(CreateQuizView(viewID));
    },
    fetchQuiz: (id: string) => {
      dispatch(CreateQuizFetching());
      HttpClient.get(`/quizsession/${id}`).then(response => {
        dispatch(CreateQuizDataFetched(response.data));
        dispatch(CreateAppBarTitle('Practice Quiz'));
      }).catch(e => {
        dispatch(CreateQuizDataFetchError(e));
      });
    },
  };
};

const QuizSession = (props: IQuizSessionProps) => {
  console.log('Entered QuizSession with props', props);
  const classes = useStyles();
  const params = useParams();
  const { session_id } = params;
  const {
    sessionID,
    fetchQuiz,
    setActiveQuestion,
    currentQuestion,
    questionsCount,
    dispatch,
    setAppBarTitle,
    toggleMarked,
    question,
    gradeQuiz,
    setQuizView,
  } = props;
  console.log('entered QuizSession with sessionID', session_id);

  useEffect(() => {
    fetchQuiz(session_id);
    return () => dispatch(ClearAppBarTitle());
  }, [session_id]);

  let ret: React.ReactElement;

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

      case 'review':
        setQuizView(IQuizView.REVIEW);
        break;
      default:
        break;
    }
  };

  if (props.fetchError) {
    ret = <ErrorTile message={props.fetchError.message} errorTitle="Error"
                     btnRetry={{ label: 'Retry', onClick: () => fetchQuiz(session_id) }}/>;
  } else if (props.question) {
    const cardHeader = `Question ${currentQuestion + 1} of ${questionsCount}`;
    setAppBarTitle(cardHeader);
    ret = (
        <Grid item xs={12} style={{ marginBottom: '30px' }}>
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
                <BottomNavigation onChange={handleChange} showLabels>
                  <BottomNavigationAction label="Previous" value="previous" disabled={currentQuestion < 1}
                                          icon={<Icon>navigate_before</Icon>}/>
                  <BottomNavigationAction label={<span><u>N</u>ext</span>} value="next" disabled={currentQuestion + 1 >= questionsCount}
                                          icon={<Icon>navigate_next</Icon>}/>
                  <BottomNavigationAction label={<span><u>R</u>eview</span>} value="review" icon={<Icon>table_chart</Icon>}/>
                  <BottomNavigationAction label="End" value="end" icon={<Icon>grading</Icon>}/>
                </BottomNavigation>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
    );
  }


  return (

      <Container maxWidth="md">
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="stretch"
            justify="space-between"
        >
          <FormMessageBar loading={!!props.fetching} error={props.quizError?.message}/>
          {ret}
        </Grid>

      </Container>
  );

};


export default connect(mapStateToProps, mapDispatchToProps)(QuizSession);
