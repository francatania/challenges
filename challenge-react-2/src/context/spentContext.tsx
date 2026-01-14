import { createContext, useState, type ReactNode } from "react";
import type { Spent, SpentToCreate, SpentToUpdate } from "../types";

interface SpentContextType{
    spents: Spent[];
    setSpents: (spents: Spent[])=>void;
    addSpent: (spent: Spent)=>void;
    updateSpent: (updated: Spent) =>void;
}

export const spentContext = createContext<SpentContextType|undefined>(undefined);

export function SpentProvider({children}: {children: ReactNode}){
    const [spents, setSpents] = useState<Spent[]>([]);

    const addSpent = (spent: Spent) =>{
        setSpents(prev => [...prev, spent]);
    }

    const updateSpent = (updated : Spent) =>{
        setSpents(prev => 
            prev.map(spent => spent.spentId === updated.spentId ? updated : spent )
        )
    }

    return (
        <>
            <spentContext.Provider value={{spents, setSpents, addSpent, updateSpent}}>
                {children}
            </spentContext.Provider>
        </>
    )
}