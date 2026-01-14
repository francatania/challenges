import { useContext } from "react";
import { spentContext } from "../context/spentContext";

export function useSpents(){
    const context = useContext(spentContext);
    if(!context){
        throw new Error("must use it with SpentProvider")
    }
    return context;
}