import { FC } from "react"
import useSWR from "swr";

import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faM, faMoneyBillTransfer, faCircleDollarToSlot, faUser, faDollar, faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { Grid, Card, CardContent, Typography, CircularProgress } from "@mui/material";

import { DashboardStats } from "@/interfaces";

export const Dashboard: FC = () => {

    const { data } = useSWR<DashboardStats>('/api/admin');

    if (!data) {
        return (
            <Grid container justifyContent='center' alignItems='center' minHeight='80vh'>
                <CircularProgress />
            </Grid>
        )
    }

    const { entriesMercadoPago, entriesPaypal, entriesTransfer, totalCollected, totalEntries, totalExpenses, totalUser } = data;

    const cardsData = [
        { title: 'MercadoPago', subTitle: 'Aportes por mercadoPago:', value: entriesMercadoPago, icon: <FontAwesomeIcon size='2x' icon={faM} color="#00bbf0" /> },
        { title: 'Paypal', subTitle: 'Aportes por paypal:', value: entriesPaypal, icon: <FontAwesomeIcon size='2x' icon={faPaypal} color="#009ee3" /> },
        { title: 'Transferencias', subTitle: 'Aportes por transferencias:', value: entriesTransfer, icon: <FontAwesomeIcon size='2x' icon={faMoneyBillTransfer} color="#008000" /> },
        { title: 'Aportes', subTitle: 'Numero total de aportes:', value: totalEntries, icon: <FontAwesomeIcon size='2x' icon={faCircleDollarToSlot} color="#ffb900" /> },
        { title: 'Usuarios', subTitle: 'Usuarios registrados:', value: totalUser, icon: <FontAwesomeIcon size='2x' icon={faUser} color="#ff9a3c" /> },
        { title: 'Recaudado', subTitle: 'Total recaudado:', value: totalCollected, icon: <FontAwesomeIcon size='2x' icon={faDollar} color="#008000" /> },
        { title: 'Gastos', subTitle: 'Gastos totales:', value: totalExpenses, icon: <FontAwesomeIcon size='2x' icon={faBagShopping} color="#c3195d" /> },
    ];

    return (
        <Grid container spacing={2} className="fadeIn">
            {
                cardsData.map(({ icon, subTitle, title, value }) => (
                    <Grid item xs={12} md={6} lg={3} key={title}>
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
