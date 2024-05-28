import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import { IClient } from "../models/IClient";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";
import Modal from '../components/modal/modal';

export default class Store{
    user = {} as IUser;
    client ={} as IClient;
    isAuth = false;
    isLoading = false;
    errorModal = false;

    constructor(){
        makeAutoObservable(this);
    }

    setAuth(bool:boolean){
        this.isAuth = bool;
    }

    setUser(user:IUser){
        this.user=user;
        console.log(this.user);
    }

    setClient(client:IClient){
        this.client=client;
       
    }


    setLoading(bool:boolean){
        this.isLoading = bool;
    }
    setErrorModal(value:boolean) {
        this.errorModal = value;
      }

    async login(email:string,password:string){
        try{
                const response=await  AuthService.login(email,password);
                console.log(response);
                localStorage.setItem('token',response.data.accessToken);
                this.setUser(response.data.user);
                this.setClient(response.data.client);
                
                this.setAuth(true);
                
        }catch (e:any){
         
            return parseInt(e.response.status)

        }
    }
    async deleteUser(id:string){
        try{
                const response=await  AuthService.deleteUser(id);
                console.log(response);
                this.setAuth(false);
                this.setUser({} as IUser);
                this.setClient({} as IClient);

        }catch (e){
            console.log(e);

        }
    }
    async registration(email:string,password:string){
        try{
                const response=await  AuthService.registration(email,password);
                console.log(response);
                localStorage.setItem('token',response.data.accessToken);
                this.setUser(response.data.user);
                
          this.setClient(response.data.client);
                this.setAuth(true);
                
        }catch (e:any){
            return parseInt(e.response.status)

        }
    }

    async logout(){
        try{
                const response=await  AuthService.logout();
                console.log(response);
                localStorage.removeItem('token');
                this.setUser({} as IUser);
                this.setClient({} as IClient);
                this.setAuth(false);
                
        }catch (e){
            console.log(e);

        }
    }

    async checkAuth() {
        try {
            this.setLoading(true);
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
            console.log('Response:', response);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            this.setUser(response.data.user);
            this.setClient(response.data.client);
            this.setAuth(true);
            return response.data;
        } catch (e:any) {
            console.log('Error:', e.response ? e.response.data : e.message);
        } finally {
            this.setLoading(false);
        }
    }
    
      async updateUser(id: string, updatedData: any) {
        try {
            const response = await AuthService.updateUser(id, updatedData);

            response.data.user.id=response.data.user._id
            this.setUser(response.data.user);
            this.setClient(response.data.client);
        } catch (e) {
            console.log(e);
        }
    }
    async checkOldPassword(id: string, password: any) {
        try {
            
            const response = await AuthService.checkOldPassword(id, { password: password });
            return response.data.isValid;
        } catch (e) {
            console.log(e);
        }
    }
    async rentReq(id: string, data: any) {
        try {
            const response = await AuthService.rentReq(id, data);

        } catch (e) {
            console.log(e);
        }
    }
    async rentUser(id: string) {
        try {
            
            const response = await AuthService.rentUser(id);
return response
        } catch (e) {
            console.log(e);
        }
    }


}