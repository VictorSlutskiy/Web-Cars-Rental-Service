import { response } from "express";
import $api from "../http"
import { AxiosResponse } from "axios";
import {AuthResponse, PassResponse} from '../models/response/AuthResponse'

export default class AuthService{
   
    static async deleteUser(id:string): Promise<AxiosResponse<AuthResponse>>{
        return $api.delete<AuthResponse>(`/deleteUser/${id}`)
    }
    static async login(email:string,password:string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('/login',{email,password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return  $api.post<AuthResponse>('/registration', { email, password });
    }
    

    static async logout(): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('/logout')
    }
    static async updateUser(id: string, updatedData: any): Promise<AxiosResponse<AuthResponse>> {
        return $api.patch<AuthResponse>(`/updateUser/${id}`, updatedData);

    }
    static async checkOldPassword(id: string, password: any): Promise<AxiosResponse<PassResponse>> {
        return $api.post<PassResponse>(`/checkPassword/${id}`, {password});
    }

    static async rentReq(id: string, data: any): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(`/rentReq/${id}`, data );
    }
  
    static  rentUser(user_id:string): Promise<AxiosResponse<AuthResponse>>{
        return $api.get<AuthResponse>(`/rents`)
    }
}


