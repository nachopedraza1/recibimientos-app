import { FC } from "react";
import { Grid } from "@mui/material";

export const Footer: FC = () => {
    return (
        <footer>
            <Grid
                container
                justifyContent="center"
                bgcolor='black'
                color='white'
                borderTop='2px solid #0A97FE'
                padding={1}
                mt={3}
            >
                Este sitio web no está afiliado ni tiene ninguna relación oficial con el Club Atlético Belgrano.
            </Grid>
        </footer>
    )
}
