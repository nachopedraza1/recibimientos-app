import { FC, ReactNode } from "react";
import { Box, Container } from "@mui/material";

interface Props {
    children: ReactNode,
    idSection: string,
    bgClass?: string,
}

export const SectionLayout: FC<Props> = ({ children, idSection, bgClass }) => {
    return (
        <Box className={bgClass}>
            <Container>
                <section id={idSection}>
                    {children}
                </section>
            </Container>
        </Box >
    )
}
