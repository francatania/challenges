import { Link, useNavigate } from "react-router-dom"
import { useTasks } from "../hooks/useTasks"
import { TASKS_STATUS, type TaskStatus, type TaskToCreate } from "../types"
import { useState } from "react"

export function TaskForm(){
    const {teams, createTask} = useTasks()
    const [title, setTittle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [team, setTeam] = useState<number>(0);
    const [status, setStatus] = useState<TaskStatus>();
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const navigate = useNavigate()

    const validateForm = (): boolean =>{
        const newErrors: {[key: string]: string} = {};

        if(title.trim() === ""){
            newErrors.title = "El titulo no puede estar en blanco."
        }else if(title.length>50)(
            newErrors.title = "El titulo no puede superar los 50 caracteres."
        )

        if(description.trim() === ""){
            newErrors.description = "La descripcion no puede estar en blanco."
        }else if(description.length > 200){
            newErrors.description = "La descripcion no superar los 200 caracteres."
        }

        if(team === 0){
            newErrors.team = "Debe elegir un equipo."
        }

        if(status === undefined){
            newErrors.status = "Debe elegir un status."
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;


    }

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) =>{

        e.preventDefault();

        if(!validateForm()){
            return;
        }

        const task: TaskToCreate ={
            title: title,
            teamId: team,
            status: status!,
            description: description
        }

        createTask(task);

        setTittle("");
        setDescription("");
        setTeam(0);
        setStatus(undefined)
        setErrors({});

        navigate('/')
    }

    return <>

        <form onSubmit={onSubmitForm}>

            <h2>Nueva tarea</h2>

            <input type="text" 
            className="input-form" 
            placeholder="Titulo" 
            onChange={(e)=>{setTittle(e.target.value)}}/>
            {errors.title && <span className="span-error">{errors.title}</span>}
           
            <input type="text" className="input-form" placeholder="Descripcion" 
            onChange={(e)=>{setDescription(e.target.value)}}/>
            {errors.description && <span className="span-error">{errors.description}</span>}
            
            <label className="label-form">Equipo asignado</label>
            <select 
            className="select-form"
            onChange={(e)=>{setTeam(Number(e.target.value))}}>
                <option>Equipo</option>
                {teams.map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                ))}
            </select>
            {errors.team && <span className="span-error">{errors.team}</span>}
          
         
            <label >Estado</label>
            <select className="select-form"
            onChange={(e)=>{setStatus(e.target.value as TaskStatus)}}>
                <option disabled>Estado</option>
                <option value={TASKS_STATUS.COMPLETADA}>{TASKS_STATUS.COMPLETADA}</option>
                <option value={TASKS_STATUS.PENDIENTE}>{TASKS_STATUS.PENDIENTE}</option>
                <option value={TASKS_STATUS.EN_PROGRESO}>{TASKS_STATUS.EN_PROGRESO}</option>
            </select>
            {errors.status && <span className="span-error">{errors.status}</span>}
          
            <input className="input-form" type="submit" value="Crear"  />
        </form>
    </>
}