import { FC, useContext, useState } from "react"
import Image from "next/image";
import Link from "next/link";

import { ConfigContext } from "@/context/config";

import { Timmer } from "@/components/Timmer"
import { ProgressBar } from "@/components/ui";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisVertical, faStar, faSackDollar, faCoins } from "@fortawesome/free-solid-svg-icons"
import { Grid, Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, Skeleton, Tooltip } from "@mui/material"

import { Rows } from "@/interfaces";


export const MatchCard: FC<{ match: Rows }> = ({ match }) => {

    const { activeMatch } = useContext(ConfigContext);

    const [imageLoading, setImageLoading] = useState(true);

    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'start' }}>

                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: '#121112' }}>
                            {
                                imageLoading ?
                                    <Skeleton variant="circular" width={'100%'} height={'100%'} />
                                    : <Image src='/logo-loading.png' width={40} height={50} alt='Recibimientos CAB' />
                            }
                        </Avatar>
                    }
                    action={
                        <Tooltip placement="right" arrow title='Ver aportes'>
                            <IconButton sx={{ margin: 1 }} disableRipple disabled={imageLoading} LinkComponent={Link} href={activeMatch?.name === match.name ? '/ingresos' : `/recibimientos/${match.name}`} >
                                <FontAwesomeIcon icon={faEllipsisVertical} size='sm' />
                            </IconButton>
                        </Tooltip>
                    }
                    title={imageLoading ?
                        <Skeleton width={150} />
                        :
                        <Tooltip title={`Belgrano - ${match.name}`} placement="top">
                            <Typography fontSize={14} sx={{
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: "vertical"
                            }}
                            >
                                Belgrano - {match.name}
                            </Typography>
                        </Tooltip>
                    }
                    subheader={imageLoading ? <Skeleton /> : <Timmer time={match.dateEvent!} />}
                />

                <CardMedia
                    loading="lazy"
                    component="img"
                    image={match.imageMatch}
                    alt="Recibimientos CAB"
                    onLoad={() => setImageLoading(false)}
                    className="fadeIn"
                    sx={{ height: { xs: 'auto', sm: '370px', opacity: imageLoading ? 0 : 1 } }}
                />

                <CardContent sx={{ minHeight: '136px' }}>
                    {
                        imageLoading ?
                            (
                                <>
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                </>
                            )
                            :
                            (
                                <>
                                    <Grid container justifyContent='space-between' className="fadeIn">
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
                                </>
                            )
                    }
                </CardContent>
            </Card>
        </Grid>
    )
}
