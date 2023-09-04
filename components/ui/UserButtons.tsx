import { useContext, useState } from 'react';

import { useSession } from 'next-auth/react';
import { AuthContext } from '@/context/auth';

import { Menu, MenuItem, ListItemIcon, IconButton } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faRightFromBracket, faCircleUser } from '@fortawesome/free-solid-svg-icons';


export const UserButtons = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { logoutUser } = useContext(AuthContext);
    const { data } = useSession();

    return (
        <>
            <IconButton onClick={handleClick} color='primary'>
                <FontAwesomeIcon icon={faCircleUser} />
            </IconButton>

            <Menu
                disableScrollLock
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem disabled>
                    <ListItemIcon >
                        <FontAwesomeIcon icon={faUser} />
                    </ListItemIcon>
                    Perfil
                </MenuItem>
                <MenuItem disabled>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faBars} />
                    </ListItemIcon>
                    Mis aportes
                </MenuItem>
                <MenuItem onClick={logoutUser}>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </ListItemIcon>
                    Cerrar sesión
                </MenuItem>
            </Menu>
        </>
    );
}