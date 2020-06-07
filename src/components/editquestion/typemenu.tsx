import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FORM_NAME } from '../../consts';
import { change, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

const selectFormValue = formValueSelector(FORM_NAME);
const FORM_FIELD_QTYPE = 'qtype'

const mapStateToProps = (state: any) => {
  const qtype = selectFormValue(state, FORM_FIELD_QTYPE);
  console.log(`value for qtype=${qtype}`);

  return { qtype };
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.paper,
      },
    }),
);

const options = [
  {
    value: 'single',
    label: 'Single Correct',
  },
  {
    value: 'multi',
    label: 'Multiple Correct',
  },
];

const TypeMenu = (props: { qtype: string, dispatch: Function }) => {
  const { qtype, dispatch } = props;
  let selectedIndex = options.findIndex(option => option.value === qtype);
  if(selectedIndex < 0) selectedIndex = 0;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(null);
    dispatch(change(FORM_NAME, FORM_FIELD_QTYPE, options[index].value));
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
            <ListItemText primary={options[selectedIndex]?.label}/>
          </ListItem>
        </List>
        <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            keepMounted
            variant="menu"
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
          {options.map((option, index) => (
              <MenuItem
                  key={index}
                  value={option.label}
                  selected={index===selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option.label}
              </MenuItem>
          ))}
        </Menu>
      </div>
  );
};

export default connect(mapStateToProps)(TypeMenu);
