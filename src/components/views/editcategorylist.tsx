import { Button, Card, CardActions, CardContent, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function () {
    const classes = useStyles();

    const navigate = useNavigate();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Category List
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="outlined" size="small" onClick={()=>{
                    navigate('new');
                }}>Create New Category</Button>
            </CardActions>
        </Card>
    )
}