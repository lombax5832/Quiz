import { Grid, Typography } from "@material-ui/core"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { IAuth } from "./authentication"
import LockIcon from '@material-ui/icons/Lock';

const NotLoggedIn = () => {
    useEffect(() => {
        window.gapi.signin2.render('my-signin2', {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
        });
    })

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
        >
            <Grid item xs={12}><LockIcon /></Grid>
            <Grid item xs={12}><Typography variant="h5">You must log in to access this page</Typography></Grid>
            <Grid item xs={12}><div id="my-signin2"></div></Grid>
        </Grid>
    )
}

const mapStateToProps = (state: { auth: IAuth }, ownProps: { isRequired?: boolean }) => {
    return {
        ...ownProps,
        loggedIn: !!state.auth?.profile
    }
}

let EnsureLogin = (props: { loggedIn?: boolean, isRequired?: boolean, children: any }) => {
    const { loggedIn, isRequired, children } = props

    if (!loggedIn && isRequired) {
        return <NotLoggedIn />
    } else {
        return <div>{children}</div>
    }
}

export default connect(mapStateToProps)(EnsureLogin)