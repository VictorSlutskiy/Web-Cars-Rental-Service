
import $api from "../http"
import { AxiosResponse } from "axios";
import {AuthResponse} from '../models/response/AuthResponse'
import { IRent } from "../models/IRent";

export default class RentService{
    static fetchAllRents(): Promise<AxiosResponse<IRent[]>>{
        
        return $api.get<IRent[]>(`/rents`)
    }
    static fetchRents(id:string): Promise<AxiosResponse<IRent[]>>{
        return $api.get<IRent[]>(`/rentUser/${id}`)
    }
    static async deleteRent(id: string): Promise<AxiosResponse<IRent>> {
        return $api.post<IRent>(`/deleteRent/${id}` );
    }
    static async confirmRent(id: string): Promise<AxiosResponse<IRent>> {
        return $api.post<IRent>(`/confirmRent/${id}` );
    }
    static async endRent(id: string): Promise<AxiosResponse<IRent>> {
        return $api.post<IRent>(`/endRent/${id}` );
    }
    
   
}