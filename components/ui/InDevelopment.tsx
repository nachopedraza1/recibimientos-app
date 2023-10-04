import Image from "next/image"
import { Grid, Typography } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons"

export const InDevelopment = () => {
    return (
        <Grid container minHeight='100vh' justifyContent='center' alignItems='center' direction='column'>
            <Image src='/logo-loading.png' width={120} height={120} alt='Recibimientos CAB' />
            <Typography variant="h5" fontWeight={600}>
                Sección en desarrollo.
            </Typography>
            <span className='mini-divider'></span>
            <FontAwesomeIcon icon={faScrewdriverWrench} color="#08b8ef" size="2x" />
        </Grid>
    )
}
