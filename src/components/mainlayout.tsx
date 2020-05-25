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
import React from 'react';
import { Outlet } from 'react-router-dom';
import UserButton from './userButton';
import { DRAWER_WIDTH } from './consts';
import NavMenu from './navmenu';


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

export default function MainLayout() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
      <div className={classes.root}>
        <CssBaseline/>
        <ClickAwayListener onClickAway={handleDrawerClose}>
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
                  Quiz
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
                  {theme.direction==='ltr' ? <ChevronLeftIcon/>:<ChevronRightIcon/>}
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
          <Container maxWidth="lg">
            <Outlet/>
          </Container>
        </main>
      </div>
  );
}
