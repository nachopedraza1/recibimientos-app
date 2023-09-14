import { TableRow, TableCell, Skeleton } from "@mui/material"

export const LoadDataTables = () => {

    const rowsLoad = [...Array(10)];

    return (
        <>
            {
                rowsLoad.map((item) => (
                    <TableRow key={item} sx={{ height: '53.02px' }} className="fadeIn">
                        <TableCell colSpan={6} sx={{ padding: '2px' }}>
                            <Skeleton animation="wave" height={12} />
                            <Skeleton animation="wave" height={12} />
                            <Skeleton animation="wave" height={12} />
                        </TableCell>
                    </TableRow>
                ))
            }
        </>
    )
}