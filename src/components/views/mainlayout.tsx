import { ClickAwayListener } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import UserButton from '../userButton';
import { DRAWER_WIDTH, JOURNEY } from '../../consts';
import NavMenu from '../navmenu';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Grid from '@material-ui/core/Grid';

const TAG = 'MainLayout';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
      },
      appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      hide: {
        display: 'none',
      },
      drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
      },
      drawerPaper: {
        width: DRAWER_WIDTH,
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -DRAWER_WIDTH,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
      title: {
        flexGrow: 1,
      },
    }),
);


export interface IMainLayoutProps {
  title: string
}



export default function MainLayout(props: IMainLayoutProps) {

  console.log(TAG, 'Entered MainLayout');
  const [value, setValue] = useState();
  const loc = useLocation();
  console.log(TAG, 'location', loc);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    console.log(TAG, 'entered handleDrawerOpen');
    setOpen(true);
  };

  const handleDrawerClose = () => {
    console.log(TAG, 'entered handleDrawerClosed');
    setOpen(false);
  };

  return (
      <>
        <div className={classes.root}>
          <CssBaseline/>
          <ClickAwayListener onClickAway={
            () => {
              console.log(TAG, 'onClickAway event');
              handleDrawerClose();
            }
          }>
            <div>
              <AppBar
                  position="fixed"
                  className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                  })}
              >
                <Toolbar>
                  <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      className={clsx(classes.menuButton, open && classes.hide)}
                  >
                    <MenuIcon/>
                  </IconButton>
                  <Typography className={classes.title} variant="h6" noWrap>
                    Quiz?
                  </Typography>
                  <UserButton/>
                </Toolbar>
              </AppBar>
              <Drawer
                  className={classes.drawer}
                  variant="persistent"
                  anchor="left"
                  open={open}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
              >
                <div className={classes.drawerHeader}>
                  <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon/>
                  </IconButton>
                </div>
                <Divider/>
                <NavMenu/>
              </Drawer>
            </div>
          </ClickAwayListener>
          <main
              className={clsx(classes.content, {
                [classes.contentShift]: open,
              })}
          >
            <div className={classes.drawerHeader}/>
            <Container>
              <Outlet/>
            </Container>
          </main>

        </div>
      </>
  );
}
