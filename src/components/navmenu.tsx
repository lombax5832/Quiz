import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavMenu = (props: any) => {
  const navigate = useNavigate();

  return (
      <List>
        <ListItem button onClick={() => navigate('welcome')} key='welcome'>
          <ListItemText primary="Welcome"/>
        </ListItem>
        <ListItem button onClick={() => navigate('counter')} key='counter'>
          <ListItemText primary="Counter"/>
        </ListItem>
        <ListItem button onClick={() => navigate('editquestion')} key='editor'>
          <ListItemText primary="Editor"/>
        </ListItem>
        <ListItem button onClick={() => navigate('editcategory')} key='editcategory'>
          <ListItemText primary="Edit Category"/>
        </ListItem>
        <ListItem button onClick={() => navigate('newquiz')} key='newquiz'>
          <ListItemText primary="New Quiz"/>
        </ListItem>
      </List>
  );
};

export default NavMenu;
