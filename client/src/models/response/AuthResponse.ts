import { BlobOptions } from "buffer";
import { IClient } from "../IClient";
import { IUser } from "../IUser";
import { IRent } from "../IRent";

export interface AuthResponse{
    accessToken:string,
    refreshToken:string;
    user: IUser;
    client: IClient;
    
}
export interface PassResponse{
    isValid:boolean,
}
