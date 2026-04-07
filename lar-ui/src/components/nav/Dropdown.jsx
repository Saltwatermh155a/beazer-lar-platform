import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function SplitButton() {
    const user = useSelector((state) => state?.user?.username);
    const isAdmin = useSelector((state) => state?.user?.isAdmin);

    const options = ["Menu", "HOME", "INPUT", "TOP", "LAR CRITERIA", "PROFORMA", "PRESIDENT'S LETTER"];

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const navigate = useNavigate();
    let location = useLocation();

    React.useEffect(() => {
        if (location.pathname === "/home") {
            setSelectedIndex(0)
        }
        if (location.pathname === "/topinputform") {
            setSelectedIndex(1)
        }
        if (location.pathname === "/topoutput") {
            setSelectedIndex(2)
        }
        if (location.pathname === "/larcriteria") {
            setSelectedIndex(3)
        }
        if (location.pathname === "/proforma") {
            setSelectedIndex(4)
        }
        if (location.pathname === "/" || location.pathname === "/presidents-letter" || location.pathname === "/letter-editor") {
            setSelectedIndex(5)
        }
    }, [location]);

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        const routes = ["/home", "/topinputform", "/topoutput", "/larcriteria", "/proforma", "/presidents-letter"];
        if (index >= 0 && index < routes.length) {
            navigate(routes[index]);
        }
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <React.Fragment>
            {user ? <>
                <ButtonGroup
                    className='me-2'
                    ref={anchorRef} aria-label="split button">
                    <Button>{options[0]}</Button>
                    <Button
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                <Popper
                    sx={{
                        zIndex: 1,
                    }}
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList id="split-button-menu" autoFocusItem>
                                        {options.filter((e) => e !== "Menu").map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                selected={index === selectedIndex}
                                                onClick={(event) => handleMenuItemClick(event, index)}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper> </>
                : null}
        </React.Fragment>
    );
}
