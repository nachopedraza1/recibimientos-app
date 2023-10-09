import { FC } from 'react'
import useSWR from 'swr';

import { CustomDivider } from '@/components/ui';
import { Grid, Typography } from '@mui/material'
import { CardLoading, InstagramCard } from '@/components/cards';

import { Post } from '@/interfaces';

export const InstagramPosts: FC = () => {

    const { data, isLoading, error } = useSWR<Post[]>('/api/posts', {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
    })

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
                    isLoading || error ?
                        [1, 2, 3, 4, 5, 6, 7, 8].map(load => <CardLoading key={load} />)
                        :
                        data?.map(post => <InstagramCard key={post.id} post={post} />)
                }
            </Grid>
        </>
    )
}
