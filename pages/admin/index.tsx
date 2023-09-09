import { useContext } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';

import { UiContext } from '@/context/ui';

import { AdminLayout } from '@/components/layouts';
import { Box, Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCircleDollarToSlot, faDollar, faFaceAngry, faM, faMoneyBillTransfer, faUser } from '@fortawesome/free-solid-svg-icons';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box >
                    <Grid container>{children}</Grid>
                </Box>
            )}
        </div>
    );
}

const cardsData = [
    { title: 'MercadoPago', subTitle: 'Aportes por MercadoPago:', icon: <FontAwesomeIcon size='2x' icon={faM} /> },
    { title: 'Paypal', subTitle: 'Aportes por Paypal:', icon: <FontAwesomeIcon size='2x' icon={faPaypal} /> },
    { title: 'Transferencias', subTitle: 'Aportes por Transferencias:', icon: <FontAwesomeIcon size='2x' icon={faMoneyBillTransfer} /> },
    { title: 'Aportes', subTitle: 'Numero total de aportes:', icon: <FontAwesomeIcon size='2x' icon={faCircleDollarToSlot} /> },
    { title: 'Usuarios', subTitle: 'Usuarios registrados:', icon: <FontAwesomeIcon size='2x' icon={faUser} /> },
    { title: 'Recaudado', subTitle: 'Total recaudado:', icon: <FontAwesomeIcon size='2x' icon={faDollar} /> },
    { title: 'Gastos', subTitle: 'Gastos totales:', icon: <FontAwesomeIcon size='2x' icon={faBagShopping} /> },
];

const AdminPage: NextPage = () => {

    const { selectedTab } = useContext(UiContext);

    return (
        <AdminLayout>

            <TabPanel value={selectedTab} index={0}>
                <Grid container spacing={2}>
                    {
                        cardsData.map((elm, index) => (
                            <Grid item xs={12} sm={4} md={3}>
                                <Card sx={{ display: 'flex' }}>
                                    <CardContent sx={{ width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        {elm.icon}
                                    </CardContent>
                                    <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant='h5'> {elm.title} </Typography>
                                        <Typography variant='caption'>{elm.subTitle}</Typography>
                                        <Typography variant='h6'>150</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </TabPanel>

            <TabPanel value={selectedTab} index={1}>
                <Grid container alignItems="center" className="fade">
                    asdasdasd123123
                </Grid>
            </TabPanel>

        </AdminLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session: any = await getSession({ req });

    if (session?.user.role !== 'admin') {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}

export default AdminPage