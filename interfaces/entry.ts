export interface IEntry {
    name: string,
    amount: number,
    date: string,
    paymentId?: number,
    status?: string,
    method?: 'mercadopago' | 'paypal' | 'transfer',
}