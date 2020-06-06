import { Button, Card, CardActions, CardContent, Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles, Typography, ButtonGroup, Divider } from '@material-ui/core';
import { Add, Edit, Delete } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import HttpClient from '../../../httpclient/client';
import LinearLoader from '../../loadingbar';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    h4: {
        fontSize: "150%",
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        //margin: 3,
    },
    divider: {
        marginTop: 10,
    }
});

export default function () {
    const classes = useStyles();

    const navigate = useNavigate();

    const [categories, setCategories] = useState()

    useEffect(() => {
        HttpClient.get('/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("Fetch Categories: ", error);
            })
    }, [])

    return (
        <>
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h4" color="textPrimary" gutterBottom>
                        Category List
                </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" size="small" startIcon={<Add />} onClick={() => {
                        navigate('new');
                    }}>Create New Category</Button>
                </CardActions>

                <LinearLoader loading={!categories} />
                {categories &&
                    <>
                        <Divider className={classes.divider} />
                        <List className={classes.root}>
                            {(categories as Array<any>).map((value) => {
                                return (
                                    <ListItem key={value._id} button disableRipple>
                                        <ListItemText><Typography variant="h6">{value.title}</Typography></ListItemText>
                                        <ListItemSecondaryAction>
                                            <ButtonGroup>
                                                <Button className={classes.button} variant="outlined" startIcon={<Edit />} color="primary" onClick={() => navigate(value._id)}>Edit</Button>
                                                <Button className={classes.button} variant="outlined" startIcon={<Delete />} color="secondary">Delete</Button>
                                            </ButtonGroup>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </>}
            </Card>
        </>
    )
}