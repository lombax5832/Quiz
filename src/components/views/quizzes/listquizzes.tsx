import React, { useEffect, useReducer } from 'react';
import { ICategoryWithQuizzes } from '../../../interfaces/ICategory';
import HttpClient from '../../../httpclient/client';
import {
  CardContent,
  CardHeader,
  Container,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import LinearLoader from '../../loadingbar';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import ErrorTile from '../../errortile';
import { useNavigate } from 'react-router-dom';
import { ExpandMore } from '@material-ui/icons';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';


export type ActionType = 'FETCH_SUCCESS' | 'FETCH_ERROR' | 'START_FETCHING'
const TAG = 'LIST_CATEGORIES';


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


export interface IAction {
  type: ActionType,
  payload?: any
}

export interface IListCategoriesProps {
  apiUri: string
  title?: string
}

const initialState = {
  categories: [],
  error: undefined,
  fetching: true,
};

export interface IListCategoriesState {
  categories: Array<ICategoryWithQuizzes>
  error?: Error
  fetching: boolean
}

const reducer = (state: IListCategoriesState, action: { type: ActionType, payload?: any }): IListCategoriesState => {

  switch (action.type) {
    case 'START_FETCHING':
      return { categories: [], fetching: true, error: undefined };
      break;

    case 'FETCH_ERROR':
      return { categories: [], fetching: false, error: action.payload };
      break;

    case 'FETCH_SUCCESS':
      return { categories: action?.payload, fetching: false, error: undefined };
  }
};


const CreateCategories = (categories: any): IAction => {
  return {
    type: 'FETCH_SUCCESS',
    payload: categories,
  };
};

const CreateError = (error: Error): IAction => {
  return {
    type: 'FETCH_ERROR',
    payload: error,
  };
};

const CreateFetching = (): IAction => {
  return {
    type: 'START_FETCHING',
  };
};


const loadData = (dispatch: Function, apiUri: string) => {
  console.log(TAG, `entered loadData with apiUri=${apiUri}`);
  dispatch(CreateFetching());

  return HttpClient.get(apiUri)
      .then(response => {
            if (response.status!==200) {
              throw new Error(`Bad response from api. status=${response.status}`);
            }

            console.log(TAG, 'Got data', response.data);
            dispatch(CreateCategories(response.data));
          },
      ).catch(err => {
        console.log(TAG, 'fetch categories error', err);
        dispatch(CreateError(new Error('Failed to Fetch Categories')));
      });
};

const ListQuizzes = (props: IListCategoriesProps) => {
  console.log(TAG, 'entered ListQuizzes with props', props);
  const classes = useStyles();
  const { apiUri, title = 'Select a Quiz' } = props;
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, { ...initialState });

  useEffect(() => {
    loadData(dispatch, apiUri);
  }, [apiUri]);


  let ret: React.ReactElement;

  if (state.error) {
    ret = <ErrorTile message={state.error.message} errorTitle="Error"
                     btnRetry={{ label: 'Retry', onClick: () => loadData(dispatch, apiUri) }}/>;
  } else if (state.fetching) {
    ret = <LinearLoader loading/>;
  } else {
    ret = (
        <Card className={classes.root}>
          <CardHeader title={title}/>
          <CardContent>
            {(state.categories as Array<any>).map((value) => (
                    <ExpansionPanel key={value._id}>
                      <ExpansionPanelSummary
                          expandIcon={<ExpandMore/>}
                      >
                        <Typography variant="h6">{value.title}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <List className={classes.list} key={value._id}>
                          {(value.quizzes as Array<any>).map(quiz => {
                            return (
                                <ListItem key={quiz._id} button disableRipple onClick={() => navigate(quiz._id)}>
                                  <ListItemText>
                                    <Typography variant="body1">{quiz.title}</Typography>
                                  </ListItemText>
                                </ListItem>
                            );
                          })}
                        </List>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                ),
            )
            }
          </CardContent>

        </Card>
    );
  }

  return (
      <Container maxWidth="md">
        {ret}
      </Container>
  );

};

export default ListQuizzes;

