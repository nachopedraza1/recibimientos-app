export interface IEntry {
    _id?: string,
    userId: string,
    name: string,
    amount: number,
    category?: string,
    createdAt: string,
    paymentId?: number,
    status?: string,
    method?: 'mercadopago' | 'paypal' | 'transfer',
}
