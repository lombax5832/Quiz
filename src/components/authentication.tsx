import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import IAuth from '../interfaces/IAuth';
import { initialized, signIn, signOut } from '../store/actions/auth';

const mapStateToProps = (state: { auth: IAuth }) => {
    return {
        initialized: state.auth.initialized
    }
}

let Authentication = (props: any) => {

    const { signIn, signOut, children } = props;
    const [initialized, setInitialized] = useState<boolean>(false)

    useEffect(() => {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({ clientId: '898363856225-9fiul6rmh2ps3a4jhnqrpq1829h84ikl.apps.googleusercontent.com', scope: 'profile email' }).then(() => {
                const GAUTH = window.gapi.auth2.getAuthInstance();

                const dispatchSignIn = () => {
                    const CURRENT_USER = GAUTH.currentUser.get();
                    const profile = CURRENT_USER.getBasicProfile();
                    signIn({
                        id: profile.getId(),
                        name: profile.getName(),
                        givenName: profile.getGivenName(),
                        familyName: profile.getFamilyName(),
                        imageURL: profile.getImageUrl(),
                        email: profile.getEmail()
                    });
                }

                GAUTH.isSignedIn.listen((signedIn: boolean) => {
                    if (signedIn) {
                        dispatchSignIn();
                    } else {
                        signOut();
                    }
                })

                if(GAUTH.isSignedIn.get()){
                    dispatchSignIn();
                }

                setInitialized(true);

               // console.log(`IS_SIGNED_IN = ${IS_SIGNED_IN}`);
            })
        })
    }, [])

    if (initialized) {
        return (
            <div>{children}</div>
        )
    } else {
        return (<div>Loading...</div>)
    }
}

export default connect(mapStateToProps, { signIn, signOut, initialized })(Authentication)