import { useState } from "react";

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
    execute: ()=>Promise<void>;
}

export function useApi<T =unknown>({url, method, body, headers: newHeaders}: UseApiOptions): UseApiResponse<T>{
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    

    const execute = async (): Promise<void>=>{
        setLoading(true);
        setData(null);
        setError(null);
        try {

            const headers: HeadersInit = {
                'Content-Type': 'application/json',
                ...newHeaders
            }

            //falta el token con useAuth

            const options: RequestInit = {
                headers,
                method
            }

            if(body && (method === "POST" || method === "PATCH")){
                options.body = JSON.stringify(body);
            }

            const response = await fetch(url, options);

            if(response.status >= 500){
                setError("Server error. Try again later.")
                return;
            }

            switch(response.status){
                case 401: 
                    setError("Not authorized.");
                    //TODO: falta agregar un navigate. Lo hago cuando exista el componente
                    return;
                case 404:
                    setError("Resource not found.")
                    return;
                case 400:
                    const error = await response.json();
                    setError(error.error);
                    return;
            }

            const result = await response.json();
            setData(result);
            
        } catch (error) {
            if(error instanceof TypeError){
                setError("Network connection error.")
            }else{
                setError(error instanceof Error ? error.message: "Error unknown.")
            }
        }
    }

    return {data, error, loading, execute};

}