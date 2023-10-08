import { FC } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisVertical, faHeart, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { Grid, Card, CardHeader, Avatar, IconButton, CardContent, CardActions, Skeleton } from "@mui/material"

export const CardLoading: FC = () => {
    return (
        <Grid item xs={12} sm={6} md={3} textAlign='start' className="fadeIn">
            <Card>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'transparent' }}>
                            <Skeleton variant="circular" width={'100%'} height={'100%'} />
                        </Avatar>
                    }
                    action={
                        <IconButton disabled>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </IconButton>
                    }
                    title={<Skeleton width={150} />}
                    subheader={<Skeleton />}
                />
                <Skeleton variant="rectangular" height={300} />
                <CardContent sx={{ padding: 1 }}>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton disabled>
                        <FontAwesomeIcon icon={faHeart} size='sm' />
                    </IconButton>
                    <IconButton disabled>
                        <FontAwesomeIcon icon={faUpRightFromSquare} size='sm' />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
}
