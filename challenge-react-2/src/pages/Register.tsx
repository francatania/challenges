import { useState, type HtmlHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { ENDPOINTS } from "../api/endpoints";
import type { RegisterData } from "../types";

export function Register(){
    const [name, setName] = useState<string|null>(null);
    const [lastName, setLastName] = useState<string|null>(null);
    const [email, setEmail] = useState<string|null>(null);
    const [password, setPassword] = useState<string|null>(null);
    const [error, setError] = useState<string|null>(null);
    const navigate = useNavigate();

    const api = useApi<void>({
            url: ENDPOINTS.REGISTER,
            method: "POST"
        })

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        
        if(!email || !password || !name || !lastName){
            setError("Debe completar los inputs.")
            return;
        }

        const registerData: RegisterData = {
                first_name: name,
                last_name: lastName,
                email: email,
                password: password
            }
        
        const result = await api.execute(registerData);
        if(result){
            console.log("registrado")
            navigate("/login");
        }

    }




        
    return(
        <>
            <section>
                <h2>Register</h2>

                <form className="" onSubmit={handleRegister}>

                    
                    <label>Nombre</label>
                    <input type="text"
                    onChange={(e) => setName(e.target.value)} />

                    
                    <label>Apellido</label>
                    <input type="text"
                    onChange={(e) => setLastName(e.target.value)} />

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
                        Registrarse
                    </button>
                    }

                </form>
            </section>
        </>
    )
}