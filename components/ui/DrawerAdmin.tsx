import { useContext } from 'react';
import { UiContext } from "@/context/ui";

import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartLine, faGear, faMoneyBillTransfer, faRightFromBracket, faSackDollar, faUser } from '@fortawesome/free-solid-svg-icons';


const tabs = [
    { text: 'Estadisticas', icon: <FontAwesomeIcon icon={faChartLine} />, tabValue: 0 },
    { text: 'Agregar Aportes', icon: <FontAwesomeIcon icon={faSackDollar} />, tabValue: 1 },
    { text: 'Agregar Gastos', icon: <FontAwesomeIcon icon={faMoneyBillTransfer} />, tabValue: 2 },
    { text: 'Usuarios', icon: <FontAwesomeIcon icon={faUser} />, tabValue: 3 },
    { text: 'Configuración', icon: <FontAwesomeIcon icon={faGear} />, tabValue: 4 },
    { text: 'Cerrar sesión', icon: <FontAwesomeIcon icon={faRightFromBracket} />, tabValue: 5 },
]

export const DrawerAdmin = () => {

    const { handleChangeTab } = useContext(UiContext);

    return (
        <>
            <Toolbar />
            <List>
                {tabs.slice(0, 4).map(({ text, icon, tabValue }) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => handleChangeTab(tabValue)}>
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
                {tabs.slice(4, 6).map(({ text, icon, tabValue }) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => handleChangeTab(tabValue)}>
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
