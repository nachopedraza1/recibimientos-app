
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
    active?: boolean,
    dateEvent?: string,
    createdAt?: string,
    totalDonated?: string,
    imageMatch?: string,
    amount?: string,
    overage?: string,
    objectiveAmount?: string,
    status?: string | 'approved' | 'COMPLETED',
    method?: "mercadopago" | "paypal" | "transfer",
}
