import { SpentStats } from "../components/SpentStats";
import { useFetchSpents } from "../hooks/useSpentFetch"

export function Dashboard(){
    const today = new Date().toISOString().split("T")[0];
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0]; 

    const {loading, error} = useFetchSpents({
        startDate: thirtyDaysAgo,
        endDate: today
    });

    return (
        <>
                <h2>Dashboard</h2>
                {loading && <span>Cargando...</span>}
                {error && <span>{error}</span>}
                <SpentStats/>
        </>

    )
}