import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { UiContext } from "@/context/ui";

import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartLine, faGear, faHome, faMoneyBillTransfer, faRightFromBracket, faSackDollar, faUser } from '@fortawesome/free-solid-svg-icons';


const tabs = [
    { text: 'Estadisticas', icon: <FontAwesomeIcon icon={faChartLine} />, tabValue: 0 },
    { text: 'Agregar Aportes', icon: <FontAwesomeIcon icon={faSackDollar} />, tabValue: 1 },
    { text: 'Agregar Gastos', icon: <FontAwesomeIcon icon={faMoneyBillTransfer} />, tabValue: 2 },
    { text: 'Usuarios', icon: <FontAwesomeIcon icon={faUser} />, tabValue: 3 },
    { text: 'Configuración', icon: <FontAwesomeIcon icon={faGear} />, tabValue: 4 },
    { text: 'Cerrar sesión', icon: <FontAwesomeIcon icon={faRightFromBracket} />, tabValue: 5 },
];

interface Props {
    drawerToggle: () => void;
}

export const DrawerAdmin: FC<Props> = ({ drawerToggle }) => {

    const router = useRouter();

    const { handleChangeTab } = useContext(UiContext);

    const navigate = (tabValue: number) => {
        handleChangeTab(tabValue);
        drawerToggle();
    }

    return (
        <>
            <Toolbar />
            <Divider />
            <ListItem disablePadding>
                <ListItemButton onClick={() => router.push('/')}>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faHome} />
                    </ListItemIcon>
                    <ListItemText primary={'Inicio'} />
                </ListItemButton>
            </ListItem>
            <Divider />
            <List>
                {tabs.slice(0, 4).map(({ text, icon, tabValue }) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => navigate(tabValue)}>
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {tabs.slice(4, 6).map(({ text, icon, tabValue }, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => index === 1 ? signOut() : navigate(tabValue)}>
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </>
    )
}
