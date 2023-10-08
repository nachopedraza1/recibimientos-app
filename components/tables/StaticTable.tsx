import { FC } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Rows } from '@/interfaces';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'Nro de aporte', width: 200, filterable: false },
    { field: 'name', headerName: 'Nombre', width: 400 },
    {
        field: 'amount',
        headerName: 'Monto',
        width: 250,
        filterable: false,
        valueGetter: (params) => {
            return parseFloat(params.row.amount.replace(/\$|\.+/g, ''));
        },
        renderCell: (params) => {
            return params.row.amount;
        },
    },
    { field: 'createdAt', headerName: 'Fecha', width: 150, filterable: false, },
];


export const StaticTable: FC<{ rows: Rows[] }> = ({ rows }) => {

    return (
        <div style={{ width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                localeText={{
                    noRowsLabel: "No se ha encontrado datos.",
                    noResultsOverlayLabel: "No se ha encontrado ningún resultado",
                    columnMenuHideColumn: 'Ocultar columna',
                    columnMenuManageColumns: 'Gestionar columnas',
                    columnsPanelHideAllButton: 'Ocultar todas',
                    columnsPanelShowAllButton: 'Ver todas',
                    columnsPanelTextFieldLabel: 'Buscar columna',
                    columnsPanelTextFieldPlaceholder: 'Columna...',
                    columnMenuSortDesc: 'Más bajos',
                    columnMenuSortAsc: 'Más altos',
                    columnMenuUnsort: 'Resetear'
                }}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[10, 20]}
                checkboxSelection
                sx={{
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#121212'
                    },
                    '& .MuiDataGrid-cell': {
                        backgroundColor: '#1d1b1b'
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: '#1d1b1b'
                    },
                    '& .MuiDataGrid-virtualScrollerContent': {
                        backgroundColor: '#1d1b1b',
                    },
                    textTransform: 'capitalize'
                }}
            />
        </div>
    )
}
