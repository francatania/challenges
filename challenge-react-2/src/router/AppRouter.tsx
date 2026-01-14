import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Dashboard } from "../pages/Dashboard";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const AppRouter = ()=>{
    return(    
    <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<ProtectedRoute>
                                        <Dashboard/>
                                </ProtectedRoute>}/>
        <Route path="/register" element={<Register/>}/>
    </Routes>
    )
} 