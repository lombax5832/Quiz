import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.paper,
      },
    }),
);

const options = [
  'Single Correct',
  'Multiple Correct',
];

export default function TypeMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <div className={classes.root}>
        <List component="nav" aria-label="Question Type">
          <ListItem
              button
              aria-haspopup="true"
              aria-controls="lock-menu"
              aria-label="Question Type"
              onClick={handleClickListItem}
          >
            <ListItemText primary={options[selectedIndex]} />
          </ListItem>
        </List>
        <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
          {options.map((option, index) => (
              <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
          ))}
        </Menu>
      </div>
  );
}
