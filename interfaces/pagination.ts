export interface Results {
    page: number,
    totalRows: number,
    totalAmount: number,
    rows: Rows[]
}

export interface Rows {
    _id?: string,
    name: string,
    amount: number,
    createdAt?: string,
    paymentId?: number,
    status?: string,
    method?: 'mercadopago' | 'paypal' | 'transfer',
}