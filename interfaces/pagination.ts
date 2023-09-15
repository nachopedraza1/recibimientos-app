export interface Results {
    page: number,
    totalRows: number,
    totalAmount?: number,
    rows: Rows[]
}

export interface Rows {
    name: string,
    amount: number,
    createdAt: string,
    status?: string | 'approved' | 'COMPLETED',
    method?: 'mercadopago' | 'paypal' | 'transfer',

}