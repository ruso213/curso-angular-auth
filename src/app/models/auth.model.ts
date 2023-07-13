export interface login {
    refresh_token: string,
    access_token: string
}

export interface registe{
    
    name: string
    email: string
    avatar:string
    id: number
    creationAt: string
    updatedAt: string
    
}
export interface checkEmail{
    isAvailable: boolean
}

export interface recovery {
    recoveryToken : string
    link: string
}