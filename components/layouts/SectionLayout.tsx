import { FC, ReactNode } from "react";
import { Box, Container } from "@mui/material";

interface Props {
    children: ReactNode,
    idSection: string,
}

export const SectionLayout: FC<Props> = ({ children, idSection }) => {
    return (
        <Box>
            <Container>
                <section id={idSection}>
                    {children}
                </section>
            </Container>
        </Box>
    )
}
