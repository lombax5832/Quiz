import { Button, Card, CardActions, CardContent, Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles, Typography } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import HttpClient from '../../../httpclient/client';
import { Link } from 'react-router-dom';

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

    const [categories, setCategories] = useState()

    useEffect(() => {
        HttpClient.get('/categories').then(response => {
            setCategories(response.data);
        }).catch(error => {
            console.error("Fetch Categories: ", error);
        })
    }, [])

    return (
        <>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Category List
                </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" size="small" onClick={() => {
                        navigate('new');
                    }}>Create New Category</Button>
                </CardActions>
            </Card>
            {categories &&
                <List className={classes.root}>
                    {(categories as Array<any>).map((value) => {

                        return (
                            <ListItem key={value._id} role={undefined} dense>
                                <ListItemIcon>
                                </ListItemIcon>
                                <Link to={value._id}><Typography>{value.title}</Typography></Link>
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="comments">
                                        <CommentIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>}
        </>
    )
}