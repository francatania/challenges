import { Route, Routes } from "react-router-dom"
import { TaskList } from "../components/TaskList"

export const AppRouter = () =>{
    return (
    <Routes>
        <Route path="/" element={<TaskList/>}/>
        <Route path="/new-task"/>
        <Route path="/task/:id"/>
        <Route path="*" element={<h1>404 NOT FOUND</h1>}/>
    </Routes>
    )

}