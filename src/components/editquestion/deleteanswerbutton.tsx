import { IconButton, Menu, MenuItem } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';


const DeleteAnswerButton = (props: { deleteFunc: Function }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { deleteFunc } = props;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <DeleteIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Cancel</MenuItem>
                <MenuItem onClick={() => {
                    deleteFunc();
                    handleClose();
                }}>Remove Answer</MenuItem>
            </Menu>
        </div>
    );
}

export default DeleteAnswerButton;