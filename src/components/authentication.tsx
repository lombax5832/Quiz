import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import IAuth from '../interfaces/IAuth';
import { initialized, signIn, signOut } from '../store/actions/auth';
import { setJourney } from '../store/actions/journey';
import { JOURNEY } from '../consts';
import IProfile from '../interfaces/IProfile';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

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
      dispatch(signIn(profile));
      dispatch(setJourney(JOURNEY));
    },

    setSignedOut: function () {
      dispatch(signOut());
      dispatch(setJourney(JOURNEY));
    },
  };
};

let Authentication = (props: any) => {

  const { setSignedIn, setSignedOut, children } = props;
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '898363856225-9fiul6rmh2ps3a4jhnqrpq1829h84ikl.apps.googleusercontent.com',
        scope: 'profile email',
      }).then(() => {
        const GAUTH = window.gapi.auth2.getAuthInstance();

        const onSignOut = () => {
          setSignedOut();
          setInitialized(true);
        };

        const onSignIn = () => {
          const CURRENT_USER = GAUTH.currentUser.get();
          const googleProfile = CURRENT_USER.getBasicProfile();
          const profile = fromGoogleProfile(googleProfile);

          setSignedIn(profile);
          setInitialized(true);
        };

        GAUTH.isSignedIn.listen((signedIn: boolean) => {
          if (signedIn) {
            onSignIn();
          } else {
            setSignedOut();
          }
        });

        if (GAUTH.isSignedIn.get()) {
          onSignIn();
        } else {
          onSignOut();
        }

      });
    });
  }, []);

  if (initialized) {
    return (
        <>{children}</>
    );
  } else {
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
