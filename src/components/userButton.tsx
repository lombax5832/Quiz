import { Avatar, IconButton } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { IAuth } from './authentication';
import GoogleLogin from 'react-google-login';


const mapStateToProps = (state: { auth: IAuth }) => {
    return {
        imgSrc: state.auth?.profile?.imageURL
    }
}

let UserButton = (props: { imgSrc: string }) => {
    const { imgSrc } = props
    if (imgSrc) {
        return (
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={() => {
                    window.gapi.auth2.getAuthInstance().signOut();
                }}
            >
                <Avatar src={imgSrc} />
            </IconButton>
        )
    } else {
        return (
            <GoogleLogin
                clientId="898363856225-9fiul6rmh2ps3a4jhnqrpq1829h84ikl.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={() => { console.log("onSuccess called") }}
                onFailure={() => { console.log("onFailure called") }}
                icon
            />
        )
    }
}

export default connect(mapStateToProps)(UserButton);