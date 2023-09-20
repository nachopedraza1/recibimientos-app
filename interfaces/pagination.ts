
export interface PaginationData {
    page?: number,
    totalRows: number,
    totalAmount?: string,
    rows: Rows[]
}

export interface Rows {
    id?: string,
    name?: string,
    email?: string,
    role?: string,
    totalDonated?: string,
    amount?: string,
    createdAt?: string,
    status?: string | 'approved' | 'COMPLETED',
    method?: "mercadopago" | "paypal" | "transfer",
}
