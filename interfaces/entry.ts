export interface IEntry {
    _id?: string,
    userId: string,
    name: string,
    amount: number,
    createdAt: string,
    paymentId?: number,
    status?: string,
    method?: 'mercadopago' | 'paypal' | 'transfer',
}
