import { Avatar, ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper } from '@material-ui/core';
import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { IAuth } from './authentication';

const mapStateToProps = (state: { auth: IAuth }) => {
    return {
        imgSrc: state.auth?.profile?.imageURL
    }
}

let UserButton = (props: { imgSrc: string }) => {

    const { imgSrc } = props
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    if (imgSrc) {
        return (
            <div>
                <IconButton
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <Avatar src={imgSrc} />
                </IconButton>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <MenuItem onClick={(event: React.MouseEvent<EventTarget>) => {
                                            handleClose(event);
                                            gapi.auth2.getAuthInstance().signOut();
                                        }}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        )
    } else {
        return (
            <GoogleLogin
                clientId="898363856225-9fiul6rmh2ps3a4jhnqrpq1829h84ikl.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={() => { console.log("onSuccess called") }}
                onFailure={() => { console.log("onFailure called") }}
                icon
            />
        )
    }
}

export default connect(mapStateToProps)(UserButton);