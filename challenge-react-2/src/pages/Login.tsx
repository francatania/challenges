import { useState } from "react";
import { ENDPOINTS } from "../api/endpoints";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth"
import type { AuthResponse, LoginCredentials } from "../types";
import type { ReactFormState } from "react-dom/client";

export function Login(){
    const {setToken} = useAuth();
    const [email, setEmail] = useState<string|null>(null);
    const [password, setPassword] = useState<string|null>(null);
    const [error, setError] = useState<string|null>(null);
    const api = useApi<AuthResponse>({
            url: ENDPOINTS.LOGIN,
            method: "POST"
        })

    const handleLogin = async(e: React.FormEvent<HTMLFormElement>)=>{
        
        e.preventDefault();

        if(!email || !password){
            setError("Debe completar los inputs.")
            return;
        }

        const credentials: LoginCredentials = {
            email: email,
            password: password
        }
        const result = await api.execute(credentials);
        if(result){
            setToken(result.accessToken)
            //console.log("login exitoso")
            setError(null)
        }
    }

    return(
        <>
            <section>
                <h2>Login</h2>

                <form className="" onSubmit={handleLogin}>

                    <label>Email</label>
                    <input type="text"
                    onChange={(e) => setEmail(e.target.value)} />

                    <label>Contraseña</label>
                    <input type="text"
                    onChange={(e) => setPassword(e.target.value)} />
                    
                    {(api.error || error) && <span className="span-error">{api.error ? api.error : error}</span>}
                    {api.loading ? 
                    <span>Cargando...</span>
                    :
                    <button>
                        Iniciar sesión
                    </button>
                    }

                </form>
            </section>
        </>
    )
}