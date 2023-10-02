
export interface PaginationData {
    page?: number,
    totalRows: number,
    totalAmount?: string,
    rows: Rows[]
}

export interface Rows {
    _id?: string,
    name?: string,
    email?: string,
    role?: string,
    totalDonated?: string,
    amount?: string,
    createdAt?: string,
    active?: boolean,
    objectiveAmount?: string,
    dateEvent?: string,
    status?: string | 'approved' | 'COMPLETED',
    method?: "mercadopago" | "paypal" | "transfer",
}
