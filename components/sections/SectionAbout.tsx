import { SectionLayout } from "../layouts"
import { Grid, Typography } from "@mui/material"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

export const SectionAbout = () => {
    return (
        <SectionLayout idSection="nosotros">
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                minHeight={{ md: '90vh', xl: '70vh' }}
                pt={10}
            >
                <Grid item xs={12} textAlign="center">
                    <Typography variant="h3" data-aos="fade-in">
                        Nosotros
                    </Typography>
                    <span className='mini-divider' data-aos="fade-in"></span>
                    <Typography variant="h6" data-aos="fade-in">
                        ¡Bienvenidos a nuestra página de Recibimientos de la Hinchada del Club Atlético Belgrano!
                        Somos un grupo de desarrolladores apasionados por el fútbol y, en particular, por nuestro amado club, el Club Atlético Belgrano.
                        Esta página tiene como objetivo resaltar y celebrar los emocionantes recibimientos que la hinchada de Belgrano realiza en cada partido.
                        Además, compartiremos información relevante sobre próximos partidos, noticias del club y eventos relacionados con la hinchada de Belgrano.
                        Queremos mantener a nuestra comunidad informada y conectada en todo momento.
                    </Typography>

                    <ul className="social-list">
                        <li data-aos="fade-up" data-aos-delay="100">
                            <a href="#">
                                <i className="fab">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </i>
                            </a>
                        </li>
                        <li data-aos="fade-up" data-aos-delay="300">
                            <a href="#">
                                <i className="fab">
                                    <FontAwesomeIcon icon={faTwitter} />
                                </i>
                            </a>
                        </li>
                        <li data-aos="fade-up" data-aos-delay="500">
                            <a href="#">
                                <i className="fab">
                                    <FontAwesomeIcon icon={faYoutube} />
                                </i>
                            </a>
                        </li>
                        <li data-aos="fade-up" data-aos-delay="700">
                            <a href="#">
                                <i className="fab">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </i>
                            </a>
                        </li>
                    </ul>

                </Grid>
            </Grid>
        </SectionLayout>

    )
}
