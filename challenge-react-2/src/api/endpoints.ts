const BASE_URL = "http://localhost:8080/api";

export const ENDPOINTS = {
    LOGIN:`${BASE_URL}/auth/login`,
    REGISTER:`${BASE_URL}/auth/register`,
    GET_BY_DATE: (start:string, end:string, account:string) => `${BASE_URL}/spents-range-date/${account}?startDate=${start}&endDate=${end}`
}