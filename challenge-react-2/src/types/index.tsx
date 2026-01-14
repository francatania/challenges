export interface LoginCredentials{
    email: string;
    password: string
}


export interface RegisterData {
    first_name: string;
    last_name: string;
    email: string;
    password: string
}

export interface AuthResponse {
    accessToken: string;
}

export interface SpentCreated {
    spentId: string;
    description: string;
    date: string;
    amount: number;
}

export interface SpentToCreate {
    accountId: string;
    amount: number;
    categoryId: string;
    date: string;
    description: string;
}

export interface SpentToUpdate {
    description?: string;
    date?: string;
    amount?: string;
}

export interface SpentUpdated extends SpentCreated{
    account: Account;
    category: Category;
}

export interface Account{
    _id: string;
    accountName: string;
}

export interface Category{
    _id: string;
    category: string;
}

export interface User{
    first_name: string;
    last_name: string;
}