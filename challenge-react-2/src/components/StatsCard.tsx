type StatsData = {
    amount: number;
    label: string;
}

export function StatsCard({amount, label} : StatsData){
    return <>
        <div className="stats-card">
            <h3>{amount}</h3>
            <span>{label}</span>
        </div>
    </>
}