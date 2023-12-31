import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { AuthContext } from '@/context/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faRightFromBracket, faGear } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuItem, ListItemIcon, IconButton, Avatar } from '@mui/material';


export const UserButtons = () => {

    const router = useRouter();

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = (path: string) => router.push(path);

    const { logoutUser, user } = useContext(AuthContext);

    return (
        <>
            <IconButton onClick={handleClick} color='primary' sx={{ p: 0, pl: 2 }} disableRipple>
                <Avatar src={user?.image ? user.image : '/default-avatar.jpg'} />
            </IconButton >


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
                <MenuItem onClick={() => navigate('/historial')}>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faBars} />
                    </ListItemIcon>
                    Mis aportes
                </MenuItem>
                {
                    user?.role === 'admin' &&
                    <MenuItem onClick={() => navigate('/admin')}>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faGear} />
                        </ListItemIcon>
                        Admin Panel
                    </MenuItem>
                }
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