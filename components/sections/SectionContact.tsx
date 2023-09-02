import { SectionLayout } from "../layouts";
import { Grid, Typography, Button } from "@mui/material";

export const SectionContact = () => {
    return (
        <SectionLayout idSection="contacto">
            <Grid container justifyContent="center" alignItems="center" minHeight="100vh" >
                <Grid item xs={12} textAlign="center">
                    <Typography variant="h3">
                        Página oficial de recibimientos CAB
                    </Typography>
                    <Typography variant="h6">
                        Con tu aporte hacemos los recibimientos
                        <Typography variant='h6' component='span' color='primary.main' mx={1} fontWeight='bold'>
                            MAS GRANDES
                        </Typography>
                        del pais.
                    </Typography>
                    <Button variant='contained' size='large' sx={{ mt: 1 }}>
                        Realiza tu aporte ahora
                    </Button>
                </Grid>
            </Grid>
        </SectionLayout>
    )
}
