import { FC } from "react";
import { Grid, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

export const Footer: FC = () => {
    return (
        <>
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

            <footer>
                <Grid
                    container
                    justifyContent="center"
                    bgcolor='black'
                    color='white'
                    borderTop='2px solid #0A97FE'
                    padding={1}
                >
                    Este sitio web no está afiliado ni tiene ninguna relación oficial con el Club Atlético Belgrano.
                </Grid>
            </footer>
        </>
    )
}
