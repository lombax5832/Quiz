import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import IAuth from '../interfaces/IAuth';
import { initialized, signIn, signOut } from '../store/actions/auth';
import { setJourney } from '../store/actions/journey';
import { JOURNEY } from '../consts';
import IProfile from '../interfaces/IProfile';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import getSession from '../services/session';
import { getSessionObject } from '../store/actions/getsessionobject';
const TAG = 'Authentication';

const fromGoogleProfile = (profile: gapi.auth2.BasicProfile): IProfile => {
  return {
    id: profile.getId(),
    name: profile.getName(),
    givenName: profile.getGivenName(),
    familyName: profile.getFamilyName(),
    imageURL: profile.getImageUrl(),
    email: profile.getEmail(),
  };
};

const mapStateToProps = (state: { auth: IAuth }) => {
  return {
    initialized: state.auth.initialized,
  };
};

const mapDispatchToProps = (dispatch: Function) => {

  return {
    setSignedIn: function (profile) {
      dispatch(getSessionObject(profile))
    },

    setSignedOut: function () {
      dispatch(signOut());
      dispatch(setJourney(JOURNEY));
    },

    setInitialized: function(){
      dispatch(initialized());
    }
  };
};

let Authentication = (props: any) => {

  console.log(TAG, 'Entered Authentication FC with initialized=', props.initialized);

  const { initialized, setSignedIn, setSignedOut, setInitialized, children } = props;

  useEffect(() => {

    if(!window || !window.gapi){
      return setSignedOut();
    }

    window.gapi.load('client:auth2', () => {

      window.gapi.client.init({
        clientId: '898363856225-9fiul6rmh2ps3a4jhnqrpq1829h84ikl.apps.googleusercontent.com',
        scope: 'profile email',
      }).then(() => {
        const GAUTH = window.gapi.auth2.getAuthInstance();

        const onSignOut = () => {
          console.log(TAG, 'entered onSignOut');
          setSignedOut();
        };

        const onSignIn = () => {
          console.log(TAG, 'entered onSignIn');
          const CURRENT_USER = GAUTH.currentUser.get();
          const googleProfile = CURRENT_USER.getBasicProfile();
          const profile = fromGoogleProfile(googleProfile);

          setSignedIn(profile);
        };

        GAUTH.isSignedIn.listen((signedIn: boolean) => {
          console.log(TAG, 'isSignedIn event with value=', signedIn);
          if (signedIn) {
            onSignIn();
          } else {
            setSignedOut();
          }
        });

        if (GAUTH.isSignedIn.get()) {
          console.log(TAG, 'isSignedIn.get() true');
          onSignIn();
        } else {
          console.log(TAG, 'isSignedIn.get() false');
          onSignOut();
          setInitialized();
        }

      });
    });
  }, []);

  if (initialized) {
    console.log(TAG, 'Authentication. Rendering content');
    return (
        <>{children}</>
    );
  } else {
    console.log(TAG, 'Authentication. Rendering loading');
    return (
        <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justify="center"
        >
          <Grid item style={{ width: '100%' }}>
            <LinearProgress variant="query"/>
          </Grid>
        </Grid>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
