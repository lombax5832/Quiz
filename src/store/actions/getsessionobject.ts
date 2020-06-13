import IProfile from '../../interfaces/IProfile';
import getSession from '../../services/session';
import { setJourney } from './journey';
import { signIn } from './auth';

export function getSessionObject(profile?: IProfile) {
  return function (dispatch) {
    getSession().then(session => {
      dispatch(setJourney(session.journey));
      if (session.profile) {
        dispatch(signIn(session.profile));
      }
    })
  }
}
