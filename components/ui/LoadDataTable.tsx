import { TableRow, TableCell, Skeleton } from "@mui/material"

export const LoadDataTables = () => {

    const loadElements = [...Array(10)];

    return (
        <>
            {loadElements.map((item, index) => (
                <TableRow key={index}>
                    <TableCell colSpan={1} >
                        <Skeleton animation="wave" variant="rounded" height={50} />
                    </TableCell>
                    <TableCell colSpan={5} >
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                    </TableCell>
                </TableRow>
            ))
            }
        </>
    )
}