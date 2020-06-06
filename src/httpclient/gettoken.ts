import { TokenGetter } from '../types/tokengetter';

const EXPIRATION_OFFSET = 3400;

const getToken: TokenGetter = () => {

  const GAUTH = window?.gapi?.auth2?.getAuthInstance();
  if (!GAUTH || !GAUTH.isSignedIn.get()) {
    return Promise.resolve(null);
  }

  const googleUser = GAUTH.currentUser.get();
  const authResponse = googleUser.getAuthResponse(true);
  const currentTimestamp = Date.now();
  const expiresIn = authResponse.expires_at - currentTimestamp;

  console.log('response expires at ', authResponse.expires_at);
  console.log('current timestamp', currentTimestamp);
  console.log('response expires in ', expiresIn);
  console.log('id_token:', authResponse.id_token);

  if(expiresIn < EXPIRATION_OFFSET * 1000) {
    console.log('token about to expire in ', expiresIn);

    return googleUser.reloadAuthResponse().then(response => {
      console.log('reloaded authResponse. Now expires at ', response.expires_at);

      return response.id_token;
    }).catch(e => {
      console.error('Failed to reloadAuth')
      return null;
    })
  }

  return Promise.resolve(authResponse.id_token);
};

export default getToken;
