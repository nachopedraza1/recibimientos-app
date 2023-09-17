export interface PaginationData {
    page?: number,
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