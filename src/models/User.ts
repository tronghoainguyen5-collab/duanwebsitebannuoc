export class User{
    public id?: string|undefined;
    public email?: string;
    public password: string
    public phone: string;
    public name: string;
    public address?: string;
    public role: "admin" | "user";

    constructor(id:string|undefined, email:string, password:string, phone:string,
     name:string, address:string, role:"admin" | "user"){
        this.id = id;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.name = name;
        this.address = address;
        this.role = role;
    }
}