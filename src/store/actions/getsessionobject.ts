import IProfile from '../../interfaces/IProfile';
import getSession from '../../components/services/session';
import { setJourney } from './journey';
import { signIn } from './auth';

export function getSessionObject(profile: IProfile){
  return function(dispatch){
    getSession(profile).then(session => {
      dispatch(setJourney(session.journey));
      dispatch(signIn(session.profile));
    })
  }
}
