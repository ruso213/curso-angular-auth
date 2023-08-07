import { bgColor } from "./color.model";
import { userResponse } from "./user.model";

export interface Meboard{
    id: number,
    title: string,
    backgroundColor: bgColor  ,
    creationAt: string,
    updatedAt: string,
    members: userResponse[]
}

