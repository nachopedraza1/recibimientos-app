import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartLine, faGear, faMoneyBillTransfer, faRightFromBracket, faSackDollar, faUser } from '@fortawesome/free-solid-svg-icons';


const tabs = [
    { text: 'Estadisticas', icon: <FontAwesomeIcon icon={faChartLine} /> },
    { text: 'Agregar aporte', icon: <FontAwesomeIcon icon={faSackDollar} /> },
    { text: 'Historial', icon: <FontAwesomeIcon icon={faMoneyBillTransfer} /> },
    { text: 'Usuarios', icon: <FontAwesomeIcon icon={faUser} /> },
    { text: 'Configuración', icon: <FontAwesomeIcon icon={faGear} /> },
    { text: 'Cerrar sesión', icon: <FontAwesomeIcon icon={faRightFromBracket} /> },
]

export const DrawerAdmin = () => {
    return (
        <>
            <Toolbar />
            <List>
                {tabs.slice(0, 4).map(({ text, icon }) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
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
                {tabs.slice(4, 6).map(({ text, icon }) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
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
