import IProfile from '../interfaces/IProfile';
import { IJourney } from '../interfaces/journeys';
import { JOURNEY } from '../consts';
import HttpClient from '../httpclient/client'

export interface ISession {
  profile: IProfile
  journey: IJourney
}

export default function getSession(profile?: IProfile): Promise<ISession> {

  return HttpClient.post('/session', {})
    .then((res) => {
      return res.data
    }).catch((e) => {
      console.error("Error from getSession", e)
      return {
        rootJourney: [{
          path: '',
          elementId: 'main'
        }]
      }
    })
}
