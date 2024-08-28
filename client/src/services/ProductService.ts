
import $api from "../http"
import { AxiosResponse } from "axios";
import {AuthResponse} from '../models/response/AuthResponse'
import { Product } from "../models/Product";

export default class ProductService{
   
    static  addProduct(data:any): Promise<AxiosResponse<Product>>{
     
        return $api.post<Product>(`/addProduct`, data)
    }
    static  deleteProduct(id:string): Promise<AxiosResponse<Product>>{
        
        return $api.delete<Product>(`/deleteProduct/${id}`)
    }
    static  updateProduct(id:string, data: any): Promise<AxiosResponse<Product>>{
        
        return $api.patch<Product>(`/updateProduct/${id}`, data)
    }
    static  getProduct(id:string): Promise<AxiosResponse<Product>>{
        
        return $api.get<Product>(`/products/${id}`)
    }
}



  