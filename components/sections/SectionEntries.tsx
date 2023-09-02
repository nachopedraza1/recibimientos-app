import { TableEntries } from "../entries/TableEntries"
import { SectionLayout } from "../layouts"
import { Grid, Typography } from "@mui/material"

export const SectionEntries = () => {
    return (
        <SectionLayout idSection="ingresos">
            <Grid container direction="column" justifyContent="center" minHeight="100vh" textAlign="center">

                <Typography variant="h3">
                    Ultimos Ingresos
                </Typography>
                <span className="mini-divider"></span>
                <Typography variant="h6" mb={5}>
                    A través de este espacio, queremos rendir homenaje a todos los hinchas que hacen posible estos increíbles recibimientos y que demuestran que el fútbol va más allá de los resultados en la cancha.
                </Typography>
                <TableEntries />

            </Grid>
        </SectionLayout>

    )
}
