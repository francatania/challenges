import type { Team } from "../types";

type FilterProps = {
    filter: number;
    onChange: (team: number) => void;
    teams: Team[];
}

export function TaskFilter({filter, onChange, teams}:FilterProps){

    return(
        <>
            <label htmlFor="team-filter">Filtrar por equipo:</label>
            <select
                id="team-filter"
                className="filter"
                value={filter}
                onChange={(e) => onChange(Number(e.target.value))}
            >
                <option value={0}>Todos los equipos</option>
                {teams.map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                ))}
            </select>
        </>
    )
}