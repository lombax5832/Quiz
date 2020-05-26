import React from 'react';
import { IJourney, IRouteParamOrDivider } from '../../interfaces/journeys';
import { Divider, ListItemIcon } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon';
import ListItemText from '@material-ui/core/ListItemText';

const NavigationItem = (props: {icon?:string, path: string, label: string, navigate: Function}) => {

  const {icon, path, label, navigate} = props;

  return (
      <ListItem button onClick={() => navigate(path)} key='welcome'>
        { icon && <ListItemIcon><Icon fontSize="small">{icon}</Icon></ListItemIcon> }
        <ListItemText primary={label}/>
      </ListItem>
  )
};

function makeNavItemsFactory(navigate: Function){

  function makeNavItems(items: Array<IRouteParamOrDivider>, path: string){

    return items.reduce( (acc:Array<any>, next) => {
      let ret = [...acc];
      let node;

      if(next === 'divider'){
        ret.push(<Divider/>)
      } else if(next.label){
        ret.push(<NavigationItem icon={next.icon} path={next.path} label={next.label} navigate={navigate}/>)
      }

      return ret;
    }, [])
  }

}
