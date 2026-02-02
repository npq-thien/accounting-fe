export type SimpleForm = {
    email: string;
    phone?: string;
    password: string;
    gender: string;
    dateOfBirth: string;
}

export type Product = {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    thumbnail: string;
}

export type ProductsResponse = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export type JournalEntry = {
    id: string;
    date: string;
    voucherNo: string;
    account: string;
    accountName: string;
    debit: number;
    credit: number;
    currency: string;
    exchangeRate: number;
    costCenter: string;
    note: string;
};