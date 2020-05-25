import { Action } from "../actions";

const INITIAL_STATE = {
  rootJourney: []
}

const journeyReducer = (state = INITIAL_STATE, action: any) => {
  console.log('in journeyReducer with action.type', action.type);
  switch (action.type) {
    case Action.SET_JOURNEY:
      console.log('in journeyReducer with payload', action.payload);
      return { ...state, ...action.payload }
    default:
      return state;
  }
}

export default journeyReducer;
