import { FC } from 'react';
import { Grid, Typography } from "@mui/material"


import { StatsGroup } from "@/components";
import { SectionLayout } from "@/components/layouts"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

export const SectionAbout: FC = () => {
    return (
        <SectionLayout idSection="nosotros">
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                minHeight={{ md: '90vh', xl: '70vh' }}
                pt={11}
            >
                <Grid item xs={12} textAlign="center">
                    <Typography variant="h3" data-aos="fade-in">
                        Nosotros
                    </Typography>
                    <span className='mini-divider' data-aos="fade-in"></span>
                    <Typography variant="h6" data-aos="fade-in">
                        Somos un grupo de desarrolladores apasionados por el fútbol y, en particular, por nuestro amado club, el Club Atlético Belgrano.
                        Esta página tiene como objetivo resaltar y celebrar los emocionantes recibimientos que la hinchada de Belgrano realiza en cada partido.
                        Además, compartiremos información relevante sobre próximos partidos, noticias del club y eventos relacionados con la hinchada de Belgrano.
                        Queremos mantener a nuestra comunidad informada y conectada en todo momento.
                    </Typography>

                    <StatsGroup />

                    <ul className="social-list">
                        <li >
                            <a href="#">
                                <i className="fab">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </i>
                            </a>
                        </li>
                        <li >
                            <a href="#">
                                <i className="fab">
                                    <FontAwesomeIcon icon={faTwitter} />
                                </i>
                            </a>
                        </li>
                        <li >
                            <a href="#">
                                <i className="fab">
                                    <FontAwesomeIcon icon={faYoutube} />
                                </i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fab">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </i>
                            </a>
                        </li>
                    </ul>

                </Grid>
            </Grid>

        </SectionLayout>

    )
}
