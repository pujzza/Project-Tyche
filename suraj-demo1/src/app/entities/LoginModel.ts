export class loginModel{
    email: string;
    password: string;
    oauth:string;
}

export class loginResponse{
    returncode:number|undefined;
    returnmessage: string|undefined;
    returndata?: LoginReturnData|undefined;
}

export class LoginReturnData{
    id: string|undefined;
    firstname: string|undefined;
    lastname: string|undefined;
    email: string|undefined;
    role:  string|undefined;
}
