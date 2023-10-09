import { FC, useState } from "react";
import Image from "next/image";

import dayjs from "dayjs";
import es from 'dayjs/locale/es'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faHeart, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Grid, Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions, Skeleton } from "@mui/material";

import { Post } from "@/interfaces";

dayjs.locale(es);

export const InstagramCard: FC<{ post: Post }> = ({ post }) => {

    const [imageLoading, setImageLoading] = useState(true);

    return (
        <Grid item xs={12} sm={6} md={3} textAlign='start' className="fadeIn">
            <Card>
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
                        <IconButton sx={{ margin: 1 }} disableRipple disabled>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </IconButton>
                    }
                    title={imageLoading ? <Skeleton width={150} /> : 'Recibimientos CAB'}
                    subheader={imageLoading ? <Skeleton /> : dayjs(post.timestamp).format('MMMM D, YYYY')}
                />
                <CardMedia
                    loading="lazy"
                    component="img"
                    image={post.media_url}
                    alt="Recibimientos CAB"
                    onLoad={() => setImageLoading(false)}
                    sx={{ height: { xs: 'auto', sm: '300px', opacity: imageLoading ? 0 : 1 } }}
                />

                <CardContent sx={{ padding: 1, minHeight: 97 }}>
                    {
                        imageLoading ?
                            (
                                <>
                                    <Skeleton height={20} />
                                    <Skeleton height={20} />
                                    <Skeleton height={20} />
                                    <Skeleton height={20} />
                                </>
                            )
                            :
                            (
                                <Typography variant="body2" color="text.secondary" sx={{
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 4,
                                    WebkitBoxOrient: "vertical",
                                }}>
                                    {post.caption}
                                </Typography>
                            )
                    }
                </CardContent>

                <CardActions disableSpacing>
                    <IconButton disabled aria-label="add to favorites">
                        <FontAwesomeIcon icon={faHeart} size='sm' />
                    </IconButton>
                    <IconButton disabled={imageLoading} aria-label="share" href='https://www.instagram.com/recibimientos.cab/' target='_blank'>
                        <FontAwesomeIcon icon={faUpRightFromSquare} size='sm' />
                    </IconButton>
                </CardActions>

            </Card>
        </Grid>
    )
}
