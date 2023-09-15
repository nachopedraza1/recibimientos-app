import { FC } from 'react';
import Image from 'next/image'
import { Divider } from '@mui/material'


export const CustomDivider: FC<{ type?: 'recibimientos' }> = ({ type }) => {
    return (
        <Divider>
            <Image src={type ? '/logo-loading.png': '/belgrano-calavera-white.png'}
                alt='Recibimientos Cab'
                width={35}
                height={35}
            />
        </Divider>
    )
}
