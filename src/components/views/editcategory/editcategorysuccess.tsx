import React from 'react'
import { Grid, Avatar, Typography, makeStyles } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: theme.palette.secondary.main,
    }
}));

export default function () {

    const classes = useStyles();

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
        >
            <Grid item xs={12}><Typography variant="h5">Successfully added new category</Typography></Grid>
            <Grid item xs={12}><Typography variant="h4"><CheckIcon color="primary"/></Typography></Grid>
        </Grid>
    )
}