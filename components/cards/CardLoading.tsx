import { FC } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"
import { Grid, Card, CardHeader, Avatar, IconButton, CardContent, Skeleton, CardMedia, Box } from "@mui/material"

export const CardLoading: FC = () => {
    return (
        <Grid item xs={12} sm={6} md={3} className="fadeIn">
            <Card>

                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: '#121112' }}>
                            <Skeleton variant="circular" width={'100%'} height={'100%'} />
                        </Avatar>
                    }
                    action={
                        <IconButton sx={{ margin: 1 }} disableRipple disabled>
                            <FontAwesomeIcon icon={faEllipsisVertical} size='sm' />
                        </IconButton>
                    }
                    title={<Skeleton width={150} />}
                    subheader={<Skeleton />}
                />

                <Box height={370} />


                <CardContent sx={{ minHeight: '136px' }}>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </CardContent>
            </Card>
        </Grid>
    )
}