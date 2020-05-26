import { Grid, Typography } from "@material-ui/core"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import LockIcon from '@material-ui/icons/Lock';
import IAuth from "../interfaces/IAuth";
import makeStyles from '@material-ui/core/styles/makeStyles';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: theme.palette.secondary.main,
    }
}));


const NotLoggedIn = () => {

    const classes = useStyles();

    useEffect(() => {
        window.gapi.signin2.render('my-signin2', {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
        });
    });

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
        >
            <Grid item xs={12}> <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar></Grid>
            <Grid item xs={12}><Typography variant="h5">You must log in to access this page</Typography></Grid>
            <Grid item xs={12}><div id="my-signin2"></div></Grid>
        </Grid>
    )
};

const mapStateToProps = (state: { auth: IAuth }, ownProps: { isRequired?: boolean }) => {
    return {
        ...ownProps,
        loggedIn: !!state.auth?.profile
    }
};

let EnsureLogin = (props: { loggedIn?: boolean, isRequired?: boolean, children: any }) => {
    const { loggedIn, isRequired, children } = props;

    if (!loggedIn && isRequired) {
        return <NotLoggedIn />
    } else {
        return <>{children}</>
    }
};

export default connect(mapStateToProps)(EnsureLogin)
