import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { FunctionComponentElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { IJourney, IRouteParam } from '../interfaces/journeys';
import { ListItemIcon } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import Divider from '@material-ui/core/Divider';
/*

const makeNavItems = (rootJourney: IJourney): Array<FunctionComponentElement<ListItem>> => {

  function makeLink(item: IRouteParam, links: Array<any>) {

  }


};
*/

const NavMenu = (props: any) => {

  const navigate = useNavigate();

  React.useEffect(() => {
    const node = loadCSS(
        'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
        document.querySelector('#font-awesome-css'),
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  return (
      <List>
        <ListItem button onClick={() => navigate('welcome')} key='welcome'>
          <ListItemIcon><Icon fontSize="small">home</Icon></ListItemIcon>
          <ListItemText primary="Welcome"/>
        </ListItem>
        <Divider/>
        <ListItem button onClick={() => navigate('counter')} key='counter'>
          <ListItemText primary="Counter"/>
        </ListItem>
        <ListItem button divider={true} onClick={() => navigate('editquestion')} key='editor'>
          <ListItemIcon><Icon>star</Icon></ListItemIcon>
          <ListItemText primary="Editor"/>
        </ListItem>
        <ListItem button onClick={() => navigate('editcategory')} key='editcategory'>
          <ListItemIcon><Icon className="fa fa-edit" fontSize="small" /></ListItemIcon>
          <ListItemText primary="Edit Category"/>
        </ListItem>
        <ListItem button onClick={() => navigate('newquiz')} key='newquiz'>
          <ListItemText primary="New Quiz"/>
        </ListItem>
      </List>
  );
};

export default NavMenu;
