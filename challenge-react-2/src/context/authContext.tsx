import { createContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../types";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    user: User | null;
    token: string | null;
    accounts: string[];
    setToken: (token: string)=>void;
    logout: ()=>void;
}

type JwtPayload = {
  first_name: string;
  last_name: string;
  accounts: string[];
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children}: {children: ReactNode}){
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem('token');
    });
    const [accounts, setAccounts] = useState<string[]>([]);
    const navigate = useNavigate();



    const logout = ()=>{
        localStorage.removeItem('token');
        setToken(null);
        navigate("/login");
    }

    useEffect(()=>{
        if(token){
            localStorage.setItem('token', token)
            const decoded = jwtDecode<JwtPayload>(token);
            const user: User ={
                first_name: decoded.first_name,
                last_name: decoded.last_name
            }
            setUser(user);
            setAccounts(decoded.accounts);
        }

    }, [token])

    return(
        <AuthContext.Provider value={{user, token, accounts, setToken, logout}}>
            {children}
        </AuthContext.Provider>
    )
}