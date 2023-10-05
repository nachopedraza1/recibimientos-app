import { FC, useContext } from "react";
import { useRouter } from "next/router";

import { UiContext } from "@/context/ui";
import { AuthContext } from "@/context/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faGear, faList, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const navlinksUser = [
    { text: 'Perfil', path: '', icon: faCircleUser },
    { text: 'Historial', path: '/historial', icon: faList },
    { text: 'Admin Panel', path: '/admin', icon: faGear },
    { text: 'Cerrar Sesión', path: '', icon: faRightFromBracket },
]

export const SidebarUserButtons: FC = () => {

    const router = useRouter();

    const { logoutUser, user } = useContext(AuthContext);
    const { toggleSidebar } = useContext(UiContext)

    const navigate = (path: string) => {
        router.push(path);
        toggleSidebar();
    }

    return (
        <>
            {navlinksUser.map(({ text, icon, path }, index) => {

                if (index === 2 && user?.role !== 'admin') return;

                return (
                    <ListItem disablePadding key={text}>
                        <ListItemButton
                            disabled={index === 0}
                            onClick={() => index === 3 ? logoutUser() : navigate(path)}
                        >
                            <ListItemIcon>
                                <FontAwesomeIcon icon={icon} color='#08b8ef' />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                )
            })}
        </>
    )
}
