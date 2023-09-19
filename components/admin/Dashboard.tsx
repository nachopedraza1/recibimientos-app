import { FC } from "react"

import { Grid, Card, CardContent, Typography } from "@mui/material";

import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faM, faMoneyBillTransfer, faCircleDollarToSlot, faUser, faDollar, faBagShopping } from "@fortawesome/free-solid-svg-icons";

import { DashboardStats } from "@/interfaces";

export const Dashboard: FC<DashboardStats> = (
    { entriesTransfer,
        entriesMercadoPago,
        entriesPaypal,
        totalCollected,
        totalEntries,
        totalExpenses,
        totalUser
    }) => {

    const cardsData = [
        { title: 'MercadoPago', subTitle: 'Aportes por MercadoPago:', value: entriesMercadoPago, icon: <FontAwesomeIcon size='2x' icon={faM} /> },
        { title: 'Paypal', subTitle: 'Aportes por Paypal:', value: entriesPaypal, icon: <FontAwesomeIcon size='2x' icon={faPaypal} /> },
        { title: 'Transferencias', subTitle: 'Aportes por Transferencias:', value: entriesTransfer, icon: <FontAwesomeIcon size='2x' icon={faMoneyBillTransfer} /> },
        { title: 'Aportes', subTitle: 'Numero total de aportes:', value: totalEntries, icon: <FontAwesomeIcon size='2x' icon={faCircleDollarToSlot} /> },
        { title: 'Usuarios', subTitle: 'Usuarios registrados:', value: totalUser, icon: <FontAwesomeIcon size='2x' icon={faUser} /> },
        { title: 'Recaudado', subTitle: 'Total recaudado:', value: totalCollected, icon: <FontAwesomeIcon size='2x' icon={faDollar} /> },
        { title: 'Gastos', subTitle: 'Gastos totales:', value: totalExpenses, icon: <FontAwesomeIcon size='2x' icon={faBagShopping} /> },
    ];

    return (
        <Grid container spacing={2}>
            {
                cardsData.map(({ icon, subTitle, title, value }) => (
                    <Grid item xs={12} sm={4} md={3} key={title}>
                        <Card sx={{ display: 'flex' }}>
                            <CardContent sx={{ width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {icon}
                            </CardContent>
                            <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
                                <Typography variant='h5'> {title} </Typography>
                                <Typography variant='caption'>{subTitle}</Typography>
                                <Typography variant='h6'> {value} </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    )
}
