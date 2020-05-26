import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { FunctionComponentElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { IJourney, IRouteParam, IRouteParamOrDivider } from '../interfaces/journeys';
import { ListItemIcon } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import Divider from '@material-ui/core/Divider';
import makeNavItemsFactory from './lib/makenavmenu';
/*

const makeNavItems = (rootJourney: IJourney): Array<FunctionComponentElement<ListItem>> => {

  function makeLink(item: IRouteParam, links: Array<any>) {

  }


};
*/

const NavMenu = (props: {rootJourney: Array<IRouteParamOrDivider>}) => {

  const navigate = useNavigate();
  const makeItems = makeNavItemsFactory(navigate);


  const navItems: React.FunctionComponent[]  = makeItems(props.rootJourney);

  console.log('navItems created', navItems.length);

  return (
      <List>
        {navItems}
      </List>
  );
};

export default NavMenu;
