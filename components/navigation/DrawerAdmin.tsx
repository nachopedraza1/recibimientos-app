import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { UiContext } from "@/context/ui";

import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartLine, faGear, faHome, faMoneyBillTransfer, faRightFromBracket, faSackDollar, faUser, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';


const tabs = [
    { text: 'Estadisticas', icon: <FontAwesomeIcon icon={faChartLine} color='#08b8ef' />, tabValue: 0 },
    { text: 'Nuevo Recibimiento', icon: <FontAwesomeIcon icon={faWandMagicSparkles} color='#08b8ef' />, tabValue: 1 },
    { text: 'Agregar Aportes', icon: <FontAwesomeIcon icon={faSackDollar} color='#08b8ef' />, tabValue: 2 },
    { text: 'Agregar Gastos', icon: <FontAwesomeIcon icon={faMoneyBillTransfer} color='#08b8ef' />, tabValue: 3 },
    { text: 'Usuarios', icon: <FontAwesomeIcon icon={faUser} color='#08b8ef' />, tabValue: 4 },
    { text: 'Configuración', icon: <FontAwesomeIcon icon={faGear} color='#08b8ef' />, tabValue: 5 },
    { text: 'Cerrar sesión', icon: <FontAwesomeIcon icon={faRightFromBracket} color='#08b8ef' />, tabValue: 6 },
];

interface Props {
    drawerToggle: () => void;
}

export const DrawerAdmin: FC<Props> = ({ drawerToggle }) => {

    const router = useRouter();

    const { handleChangeTab } = useContext(UiContext);

    const navigate = (tabValue: number) => {
        handleChangeTab(tabValue);
        window.innerWidth < 600 && drawerToggle();
    }

    return (
        <>
            <Toolbar />
            <Divider />
            <ListItem disablePadding>
                <ListItemButton onClick={() => router.push('/')}>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faHome} color='#08b8ef' />
                    </ListItemIcon>
                    <ListItemText primary={'Inicio'} />
                </ListItemButton>
            </ListItem>
            <Divider />
            <List>
                {tabs.slice(0, 5).map(({ text, icon, tabValue }) => (
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
                {tabs.slice(5, 7).map(({ text, icon, tabValue }, index) => (
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
