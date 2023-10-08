import { FC } from "react"
import Image from "next/image";

import { Timmer } from "@/components/Timmer"
import { ProgressBar } from "@/components/ui";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisVertical, faStar, faSackDollar, faCoins } from "@fortawesome/free-solid-svg-icons"
import { Grid, Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography } from "@mui/material"

import { Rows } from "@/interfaces";


export const MatchCard: FC<{ match: Rows }> = ({ match }) => {
    return (
        <Grid item xs={12} sm={6} md={3.5} className="fadeIn">
            <Card>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: '#121112' }}>
                            <Image src='/logo-loading.png' width={40} height={50} alt='Recibimientos CAB' />
                        </Avatar>
                    }
                    action={
                        <IconButton sx={{ margin: 1 }} disableRipple>
                            <FontAwesomeIcon icon={faEllipsisVertical} size='sm' />
                        </IconButton>
                    }
                    title={`Belgrano - ${match.name}`}
                    subheader={<Timmer time={match.dateEvent!} />}
                    sx={{ padding: 1 }}
                />
                <CardMedia
                    loading='eager'
                    component="img"
                    image={match.imageMatch}
                    alt="Recibimientos CAB"
                    sx={{ height: { xs: 'auto', sm: '370px' } }}
                />
                <CardContent>
                    <Grid container justifyContent='space-between'>
                        <Grid item xs={6} >
                            <Typography>
                                <FontAwesomeIcon icon={faStar} style={{ marginRight: 5 }} color='#08b8ef' />
                                Objetivo:
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Typography>
                                {match.objectiveAmount}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                <FontAwesomeIcon icon={faSackDollar} style={{ marginRight: 5 }} color='green' />
                                Recaudado:
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Typography>
                                {match.totalDonated}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                <FontAwesomeIcon icon={faCoins} style={{ marginRight: 5 }} color='yellow' />
                                Sobrante:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography>
                                {match.overage}
                            </Typography>
                        </Grid>
                    </Grid>
                    <ProgressBar total={match.totalDonated!} objetive={match.objectiveAmount!} />
                </CardContent>
            </Card>
        </Grid>
    )
}
