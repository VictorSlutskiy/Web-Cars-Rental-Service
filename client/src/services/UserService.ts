
import $api from "../http"
import { AxiosResponse } from "axios";
import {AuthResponse} from '../models/response/AuthResponse'
import { IUser } from "../models/IUser";

export default class UserService{
    static fetchUsers(): Promise<AxiosResponse<IUser[]>>{
        return $api.get<IUser[]>('/users')
    }
    static getUserById(id:string): Promise<AxiosResponse<IUser>>{
        return $api.get<IUser>(`/users/${id}`)
    }
    static deleteUser(id: string): Promise<AxiosResponse<IUser>>{
        return $api.delete<IUser>(`/deleteUser/${id}`)
    }
   
}


export async function fetchUsers(searchValue:string) {
    try {
      const response = await $api.get<IUser[]>(`/users?search=${searchValue}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  }
  