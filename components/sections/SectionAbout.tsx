import { FC } from 'react';
import { Grid, Tooltip, Typography } from "@mui/material"


import { StatsGroup } from "@/components";
import { SectionLayout } from "@/components/layouts"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

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

                    <Typography fontSize={{ xs: 39, md: 46 }} fontWeight='bold'>
                        Nosotros
                    </Typography>

                    <span className='mini-divider' data-aos="fade-in"></span>
                    <Typography variant="h6" data-aos="fade-in">
                        RecibimientosCAB es la unión de todas las agrupaciones de Belgrano, que representan a las cuatro tribunas con un único propósito:
                        seguir metiendo la fiesta más grande del país en cada partido. Además, compartiremos información relevante sobre próximos recibimientos
                        y eventos relacionados con la hinchada de Belgrano.
                        Queremos mantener a nuestros hinchas informados y conectados en todo momento. A los recibimientos los hacemos entre todos.
                    </Typography>

                    <StatsGroup />

                    <ul className="social-list">
                        <li >
                            <a href="https://x.com/recibimientocab" target='_blank'>
                                <i className="fab">
                                    <FontAwesomeIcon icon={faTwitter} />
                                </i>
                            </a>
                        </li>
                        <li>
                            <a href="https://instagram.com/recibimientos.cab" target='_blank'>
                                <i className="fab">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </i>
                            </a>
                        </li>
                        <li >
                            <Tooltip title='Próximamente...' placement='right' arrow>
                                <a>
                                    <i className="fab">
                                        <FontAwesomeIcon icon={faYoutube} />
                                    </i>
                                </a>
                            </Tooltip>
                        </li>
                    </ul>

                </Grid>
            </Grid>

        </SectionLayout>

    )
}
