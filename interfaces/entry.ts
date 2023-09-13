export interface IEntry {
    userId: string,
    name: string,
    amount: number,
    createdAt: string,
    paymentId?: number,
    status?: string,
    method?: 'mercadopago' | 'paypal' | 'transfer',
}

export interface PaginationData {
    page: number,
    entries: IEntry[],
    totalPages: number,
    currentPage: number,
    totalEntries: number,
}