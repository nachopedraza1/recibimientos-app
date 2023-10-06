import { FC } from 'react'
import Image from 'next/image';
import useSWR from 'swr';
import dayjs from 'dayjs';
import es from 'dayjs/locale/es'

import { CustomDivider } from '@/components/ui';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from '@mui/material'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faHeart, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import { Post } from '@/interfaces';

dayjs.locale(es);

export const InstagramPosts: FC = () => {

    const { data, isLoading } = useSWR<Post[]>('/api/posts')

    return (
        <>
            <Typography fontSize={{ xs: 34, md: 46 }} fontWeight='bold' mt={8}>
                Últimas
                <Typography fontSize={{ xs: 34, md: 46 }} fontWeight='bold' component={'span'} color='primary' mx={1}>
                    noticias CAB
                </Typography>
            </Typography>

            <CustomDivider />

            <Grid container spacing={2} mt={2} mb={4}>
                {
                    data?.map(({ id, username, caption, media_url, timestamp }) => (

                        <Grid item xs={12} sm={6} md={3} key={id} textAlign='start'>
                            <Card>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: '#121112' }}>
                                            <Image src='/logo-loading.png' width={40} height={50} alt='Recibimientos CAB' />
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton disabled>
                                            <FontAwesomeIcon icon={faEllipsisVertical} />
                                        </IconButton>
                                    }
                                    title="Recibimientos CAB"
                                    subheader={dayjs(timestamp).format('MMMM D, YYYY')}
                                />
                                <CardMedia
                                    component="img"
                                    image={media_url}
                                    alt="Recibimientos CAB"
                                    sx={{ height: { xs: 'auto', sm: '300px' } }}
                                />
                                <CardContent sx={{ padding: 1 }}>
                                    <Typography variant="body2" color="text.secondary" sx={{
                                        overflow: "hidden",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 4,
                                        WebkitBoxOrient: "vertical",
                                    }}>
                                        {caption}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton disabled aria-label="add to favorites">
                                        <FontAwesomeIcon icon={faHeart} size='sm' />
                                    </IconButton>
                                    <IconButton aria-label="share" href='https://www.instagram.com/recibimientos.cab/' target='_blank'>
                                        <FontAwesomeIcon icon={faUpRightFromSquare} size='sm' />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid >
        </>
    )
}
