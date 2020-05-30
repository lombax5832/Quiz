import IProfile from '../../interfaces/IProfile';
import { IJourney } from '../../interfaces/journeys';
import { JOURNEY } from '../../consts';

export interface ISession {
  profile: IProfile
  journey: IJourney
}

export default function getSession(profile: IProfile): Promise<ISession> {

  return new Promise(resolve => {

    setTimeout(function () {
      console.log('getSession resolving session');
      resolve({
        profile,
        journey: { ...JOURNEY },
      });
    }, 1000);
  });
}
