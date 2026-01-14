import { useState } from "react";
import { useSpents } from "../hooks/useSpents";
import { StatsCard } from "./StatsCard";

export function SpentStats(){
    const {spents} = useSpents();
    const total = spents.reduce((acc, spent) => acc + spent.amount, 0)
    const groupedByCategory = spents.reduce<Record<string, number>>(
        (acc, spent) =>{
            acc[spent.category] = (acc[spent.category] ?? 0) + spent.amount;
            return acc;
    }, {})

    return <>
        <section className="stats-section">
            <StatsCard amount={total} label="Total"/>
            {Object.entries(groupedByCategory).map(
                ([category, amount]) =>
                 ( <StatsCard amount={amount} label={category} key={category} />)
                
            )}
        </section>
    </>

}