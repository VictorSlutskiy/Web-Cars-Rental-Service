
import $api from "../http"
import { AxiosResponse } from "axios";
import {AuthResponse} from '../models/response/AuthResponse'
import { Category } from "../models/Category";

export default class CategoryService{
    static  updateCategory(id:string, data: any): Promise<AxiosResponse<Category>>{
        
        return $api.patch<Category>(`/updateCategory/${id}`, data)
    }
    static  deleteCategory(id:string): Promise<AxiosResponse<Category>>{
        
        return $api.delete<Category>(`/deleteCategory/${id}`)
    }
}



  