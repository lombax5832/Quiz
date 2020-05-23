import { combineReducers } from "redux";
import counterReducer from "./reducers/counter";
import authReducer from "./reducers/auth"
import { reducer as formReducer } from 'redux-form';

const routeReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer,
    form: formReducer
})

export default routeReducer;
