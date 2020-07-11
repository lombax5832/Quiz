import { AppBarAction } from '../actions/appbar';

const INITIAL_STATE = {
  title: undefined,
};


const AppBarReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case AppBarAction.SET_APPBAR_TITLE:
      return { ...state, title: action.payload };

    case AppBarAction.CLEAR_APPBAR_TITLE:
      return { ...state, title: undefined };

    default:
      return state;
  }
};

export default AppBarReducer;
