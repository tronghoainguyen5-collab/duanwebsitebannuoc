import type { Order } from "../models/Order.js";
import type { Product } from "../models/Product.js";
import { User } from "../models/User.js";
import { ApiService } from "./ApiService.js";

export class StatisticService extends ApiService{
    private static instance: StatisticService;
    static getInstance():StatisticService{
        if(!StatisticService.instance){
            StatisticService.instance = new StatisticService();
        }
        return StatisticService.instance;
    }

    async getTotalProduct():Promise<number>{
        const data = await this.get<Product[]>(`/products`);
        return data.length;
    }

    async getTotalUser():Promise<number>{
        const data = await this.get<User[]>(`/users`);
        return data.length;
    }

    async getTotalOrder():Promise<number>{
        const data = await this.get<Order[]>(`/orders`);
        return data.length;
    }

    async getTotalMoney():Promise<number>{
        const data = await this.get<Order[]>(`/orders?status=success`);
        return data.reduce((sum:number, item:Order) => sum + item.total, 0);
    }

    async getRevenueByDate(): Promise<[string, number][]> {
        const orders:Order[] = await this.get<Order[]>(`/orders?status=success`);
        const revenue = orders.reduce((sum: any, item:Order) =>{
            const date:string|undefined = new Date(item.createDate).toISOString().split('T')[0]; // Lấy ngày theo định dạng YYYY-MM-DD
            if(date){
                sum[date] = (sum[date] || 0) + item.total; // Cộng dồn doanh thu theo ngày
        } 
        return sum;
    },{} as [string, number]);
    return revenue;
    }
    
    async create(user:User):Promise<User>{
        const data = await this.post<User>('/users', user);
        return new User(data.id||"", data.email||"",data.password||"",data.phone,data.name,data.address||"",data.role);
    }

   async checkEmailValid(email:string):Promise<boolean>{
        const data = await this.get<User[]>(`/users?email=${email}`);
        if(data.length > 0){
            // console.log(data);
            return false;
        }
        return true;
    }
    
    async login(email:string, password:string):Promise<User | false> {
        const data = await this.get<User[]>(`/users?email=${email}&password=${password}`);
            if(data.length>0 && data[0]){
            let user:User = data[0];
            return new User(user.id, email,"", user.phone, user.name,user.address || "", user.role);
        }
        return false;
    }
    saveLoginState(user:User):void{
        localStorage.setItem('user', JSON.stringify(user));
    }
    getLoginState():User|false{
            let userString: string | null = localStorage.getItem('user');
            if(userString){
            let user:User = JSON.parse(userString);
            return new User(user.id, user.email||"", "", user.phone, user.name, user.address||"", user.role);
        }
        return false;
    }
    clearLoginState():void{
        localStorage.removeItem('user')
    }
 }