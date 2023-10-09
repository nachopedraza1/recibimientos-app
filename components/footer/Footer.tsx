import { FC } from "react";
import Image from "next/image";
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { CustomDivider } from '../ui/CustomDivider';

const socialLinks = [
    { link: 'https://x.com/recibimientocab', icon: faTwitter },
    { link: 'https://instagram.com/recibimientos.cab', icon: faInstagram },
    { link: '', icon: faYoutube }
]

export const Footer: FC = () => {
    return (

        <footer>
            <Grid
                container
                justifyContent="center"
                color='white'
                marginTop={10}
                padding={1}
                bgcolor='transparent'
                textAlign='center'
                alignItems='center'
            >


                <Grid container justifyContent='center' alignItems='center'>
                    <ul className="social-list">
                        {socialLinks.map(red => (
                            <li>
                                <a href={red.link} target='_blank'>
                                    <i className="fab">
                                        <FontAwesomeIcon icon={red.icon} />
                                    </i>
                                </a>
                            </li>
                        ))}
                    </ul>
                </Grid>

                <Grid item xs={3}>
                    <CustomDivider />
                </Grid>

                <Grid container justifyContent='center' alignItems='center' gap={1}>
                    <Image src='/logo-footer1.png' alt="Recibimientos CAB" width={50} height={40} />
                    {/*   <span className="mini-divider-vert" /> */}
                    <Image src='/logo-footer2.png' alt="Recibimientos CAB" width={50} height={40} />
                    {/*   <span className="mini-divider-vert" /> */}
                    <Image src='/logo-footer3.png' alt="Recibimientos CAB" width={90} height={60} />
                    {/*   <span className="mini-divider-vert" /> */}
                    <Image src='/logo-footer5.png' alt="Recibimientos CAB" width={90} height={60} />
                </Grid>

                Este sitio web no está afiliado ni tiene ninguna relación oficial con el Club Atlético Belgrano.
            </Grid>
        </footer>
    )
}
