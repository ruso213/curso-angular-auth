import { userResponse } from "./user.model";

export interface board{
    id: number,
    title: string,
    backgroundColor:string,
    creationAt: string,
    updatedAt: string,
    members: userResponse[]
}