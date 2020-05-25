import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import authReducer from "./reducers/auth";
import counterReducer from "./reducers/counter";
import journeyReducer from "./reducers/journey";

const routeReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer,
    form: formReducer,
    journey: journeyReducer
});

export default routeReducer;
