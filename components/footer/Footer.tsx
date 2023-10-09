import { FC } from "react";
import Image from "next/image";
import { Divider, Grid, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

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
                padding={1}
                bgcolor='transparent'
            >
                <Grid container justifyContent='center' alignItems='center' gap={1}>
                    <Image src='/logo-footer1.png' alt="Recibimientos CAB" width={50} height={40} />
                    
                    <Image src='/logo-footer2.png' alt="Recibimientos CAB" width={50} height={40} />
                    
                    <Image src='/logo-footer5.png' alt="Recibimientos CAB" width={90} height={60} />
                </Grid>

{/*                 <Grid container justifyContent='center'>
                    <ul className="social-list">
                        {socialLinks.map(red => (
                            <li >
                                <a href={red.link} target='_blank'>
                                    <i className="fab">
                                        <FontAwesomeIcon icon={red.icon} />
                                    </i>
                                </a>
                            </li>
                        ))}
                    </ul>
                </Grid> */}

                Este sitio web no está afiliado ni tiene ninguna relación oficial con el Club Atlético Belgrano.
            </Grid>
        </footer>
    )
}
