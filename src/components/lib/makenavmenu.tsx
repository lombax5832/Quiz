import React from 'react';
import { IJourney, IRouteParamOrDivider } from '../../interfaces/journeys';
import { Divider, ListItemIcon } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon';
import ListItemText from '@material-ui/core/ListItemText';
import { NavigateFunction } from 'react-router';

interface INavigationItemProps {
  icon?: string
  path: string
  label: string
  divider: boolean
  id: string
  navigate: Function
};

const NavigationItem = (props: INavigationItemProps) => {

  const { icon, path, label, navigate, divider, id } = props;

  return (
      <ListItem button divider={divider} onClick={() => navigate(path)} key={id}>
        {icon && <ListItemIcon><Icon fontSize="small">{icon}</Icon></ListItemIcon>}
        <ListItemText primary={label}/>
      </ListItem>
  );
};

export default function makeNavItemsFactory(navigate: NavigateFunction) {

  return function makeNavItems(items: Array<IRouteParamOrDivider>, path: string = '', level = 1): React.FunctionComponent[] {

    console.log('entered makeNavItems with count=', items.length);

    return items.reduce((acc: Array<any>, next, index) => {
      let ret = [...acc];


      if (next==='divider') {
        ret.push(<Divider/>);
      } else {
        if (next.label) {
          ret.push(<NavigationItem
              icon={next.icon}
              path={next.path}
              label={next.label}
              navigate={navigate}
              id={`${level}.${index}`}
              divider={!!next.divider}/>);
        }

        if (next.children) {
          ret = ret.concat(makeNavItems(next.children, next.path, level + 1));
        }
      }


      return ret;
    }, []);
  };

}
