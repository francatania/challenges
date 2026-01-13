import { createContext, useState, type ReactNode } from "react";
import type { Account, LoginCredentials, RegisterData, User } from "../types";

interface AuthContextType {
    user: User | null;
    token: string | null;
    accounts: Account[];
    setToken: (token: string)=>void;
    logout: ()=>void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children}: {children: ReactNode}){
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [accounts, setAccounts] = useState<Account[]>([]);

    const logout = ()=>{
        localStorage.removeItem('token');
        setToken(null);
        //TODO: navigate a /login
    }


    return(
        <AuthContext.Provider value={{user, token, accounts, setToken, logout}}>
            {children}
        </AuthContext.Provider>
    )
}