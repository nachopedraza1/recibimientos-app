export interface ResponsePagination {
    rowsEntries: Rows[],
    totalRowsEntries: number,
    totalAmountEntries: string
    rowsExpenses: Rows[],
    totalRowsExpenses: number,
    totalAmountExpenses: string
}

export interface PaginationData {
    page: number,
    totalRows: number,
    totalAmount: string,
    rows: Rows[]
}

export interface Rows {
    _id?: string,
    name: string,
    amount: string,
    createdAt?: string,
    status?: string | 'approved' | 'COMPLETED',
    method?: "mercadopago" | "paypal" | "transfer",
}