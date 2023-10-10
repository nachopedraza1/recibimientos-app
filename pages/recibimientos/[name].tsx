import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { db } from '@/database';
import { format } from '@/utils';
import { Entry, Match } from '@/models';

import { Blob } from '@/components/ui';
import { MainLayout } from '@/components/layouts';
import { StaticTable } from '@/components/tables';

import { Container, Grid, Typography } from '@mui/material';

import { Rows } from '@/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';

interface Props {
    rows: Rows[];
    name: string[];
    totalCollected: number;
}

const RecibimientoPage: NextPage<Props> = ({ rows, name, totalCollected }) => {


    return (
        <MainLayout title='Recibimientos CAB'>
            <Container>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    textAlign="center"
                    pt={10}
                    data-aos="fade"
                >
                    <Typography fontSize={{ xs: 39, md: 46 }} fontWeight='bold' color='primary'>
                        Recibimiento
                        <span style={{ color: '#fff', fontWeight: 'lighter', marginLeft: 10, textTransform: 'capitalize' }}>vs {name} </span>
                    </Typography>

                    <span className="mini-divider" />
                    <Typography variant="h6" mb={3}>
                        Aquí podras ver todos los aportes realizados para el recibimiento contra {name}.
                    </Typography>

                    <Typography variant='h5' fontWeight='bold' mb={2}>
                        <FontAwesomeIcon icon={faSackDollar} style={{ marginRight: 5 }} color='green' />
                        Total recaudado:
                        <span style={{ color: '#08b8ef', marginLeft: 10, textTransform: 'capitalize' }}> ${format(totalCollected)} </span>
                    </Typography>
                </Grid>

                <StaticTable rows={rows} />

                <Blob width="50%" top="7%" left="74%" />
                <Blob width="50%" top="24%" left="5%" />
                <Blob width="50%" top="52%" left="40%" />
            </Container>
        </MainLayout>
    )
}

export default RecibimientoPage;


export const getStaticPaths: GetStaticPaths = async () => {

    await db.connect();
    const paths = await Match.find().select('name -_id');
    await db.disconnect();


    return {
        paths: paths.map(path => ({
            params: {
                name: path.name
            }
        })),
        fallback: false
    }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { name } = params as { name: string }

    await db.connect();
    const results = await Entry.find({ category: name }).select('name amount createdAt -_id').lean();
    const match = await Match.findOne({ name })
    await db.disconnect();

    const rows = results.map((row, index) => ({
        ...row,
        id: index + 1,
        createdAt: JSON.stringify(row.createdAt).slice(1, 11),
        amount: `$${format(row.amount)}`,
    }));

    const totalCollected = rows.reduce((acc, current) => {
        const currentAmount = parseFloat(current.amount.replace(/\$|\.+/g, ''));
        return acc + currentAmount
    }, 0)

    return {
        props: {
            name,
            totalCollected: totalCollected - match?.iva!,
            rows: rows.filter(row => row.name !== 'administrador'),
        }
    }
}