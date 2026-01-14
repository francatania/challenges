import { useState } from "react";
import { useAuth } from "./useAuth";

interface UseApiOptions{
    url: string;
    method: string;
    body?: unknown;
    headers? : Record<string, string>;
}

interface UseApiResponse<T>{
    data: T | null;
    loading: boolean;
    error: string | null;
    execute: (dinamicBody?: unknown)=>Promise<T| null>;
}

export function useApi<T =unknown>({url, method, body, headers: newHeaders}: UseApiOptions): UseApiResponse<T>{
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const {token} = useAuth()
    

    const execute = async (dinamicBody?: unknown): Promise<T | null>=>{
        setLoading(true);
        setData(null);
        setError(null);
        try {

            let headers: HeadersInit = {
                'Content-Type': 'application/json',
                ...newHeaders
            }

            //falta el token con useAuth

            if(token){
                headers = {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            }

            const options: RequestInit = {
                headers,
                method
            }

            const finalBody = dinamicBody || body;

            if(finalBody && (method === "POST" || method === "PATCH")){
                options.body = JSON.stringify(finalBody);
            }

            const response = await fetch(url, options);

            if(response.status >= 500){
                setError("Server error. Try again later.")
                return null;
            }

            switch(response.status){
                case 401: 
                    setError("Not authorized.");
                    //TODO: falta agregar un navigate. Lo hago cuando exista el componente
                    return null;
                case 404:
                    setError("Resource not found.")
                    return null;
                case 400:
                    const error = await response.json();
                    console.log(error)
                    setError(error.message);
                    return null;
            }

            const result = await response.json();
            setData(result);
            return result;
            
        } catch (error) {
            if(error instanceof TypeError){
                setError("Network connection error.")
                return null;
            }else{
                setError(error instanceof Error ? error.message: "Error unknown.")
                return null;
            }
        }
        finally{
            setLoading(false);
        }
    }

    return {data, error, loading, execute};

}