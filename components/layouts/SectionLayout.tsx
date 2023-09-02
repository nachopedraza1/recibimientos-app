import { Box, Container } from "@mui/material"
import { FC, ReactNode } from "react"

interface Props {
    children: ReactNode,
    bgColor?: string,
    className?: string,
    idSection: string,
}

export const SectionLayout: FC<Props> = ({ children, bgColor, idSection, className }) => {
    return (
        <Box bgcolor={bgColor} className={className}>
            <Container>
                <section id={idSection}>
                    {children}
                </section>
            </Container>
        </Box>
    )
}
