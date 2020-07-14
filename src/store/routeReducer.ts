import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import authReducer from "./reducers/auth";
import appBarReducer from './reducers/appbar'
import counterReducer from "./reducers/counter";
import journeyReducer from "./reducers/journey";
import quizReducer from './reducers/quiz';

const routeReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer,
    form: formReducer,
    journey: journeyReducer,
    quiz_session: quizReducer,
    appbar: appBarReducer
});

export default routeReducer;
