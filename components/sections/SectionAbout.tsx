import { SectionLayout } from "../layouts"
import { Grid, Link, List, ListItem, Typography } from "@mui/material"

export const SectionAbout = () => {
    return (
        <SectionLayout idSection="nosotros">
            <Grid container justifyContent="center" alignItems="center" minHeight="100vh" >
                <Grid item xs={12} textAlign="center">
                    <Typography variant="h3">
                        Nosotros
                    </Typography>
                    <span className='mini-divider'></span>
                    <Typography variant="h6">
                        ¡Bienvenidos a nuestra página de Recibimientos de la Hinchada del Club Atlético Belgrano!
                        Somos un grupo de desarrolladores apasionados por el fútbol y, en particular, por nuestro amado club, el Club Atlético Belgrano.
                        Esta página tiene como objetivo resaltar y celebrar los emocionantes recibimientos que la hinchada de Belgrano realiza en cada partido.
                        Además, compartiremos información relevante sobre próximos partidos, noticias del club y eventos relacionados con la hinchada de Belgrano.
                        Queremos mantener a nuestra comunidad informada y conectada en todo momento.
                        {/*  A través de este espacio, queremos rendir homenaje a todos los hinchas que hacen posible estos increíbles recibimientos y que demuestran que el fútbol va más allá de los resultados en la cancha. */}
                    </Typography>

                    <ul className="social-list">
                        <li><a href="#"><i className="fab fa-facebook" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i className="fab fa-twitter" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i className="fab fa-youtube" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i className="fab fa-instagram" aria-hidden="true"></i></a></li>
                    </ul>

                </Grid>
            </Grid>
        </SectionLayout>

    )
}
