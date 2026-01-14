import { useEffect } from "react";
import { ENDPOINTS } from "../api/endpoints";
import type { Spent } from "../types";
import { useApi } from "./useApi";
import { useAuth } from "./useAuth";
import { useSpents } from "./useSpents";

interface UseFetchSpentsParams {
    startDate: string;       
    endDate: string;         
}


interface UseFetchSpentsReturn {
    spents: Spent[];
    loading: boolean;
    error: string | null;
}


export function useFetchSpents({
    startDate,
    endDate
}: UseFetchSpentsParams): UseFetchSpentsReturn {
    const {spents, setSpents} = useSpents();
    const {accounts} = useAuth();
    const api = useApi<Spent[]>({
        url: ENDPOINTS.GET_BY_DATE(startDate, endDate, accounts[0]),
        method: "GET"
    })

    const refreshSpents = async () =>{
        const result = await api.execute();
        if(result){
            setSpents(result)
        }
    }

    useEffect(()=>{
        if(accounts && accounts.length > 0){
            refreshSpents();
        }
    }, [startDate, endDate, accounts])

    return {spents, loading:api.loading, error:api.error}
}