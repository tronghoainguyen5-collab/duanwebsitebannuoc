import { Topping } from "../models/Topping.js";
import { ApiService } from "./ApiService.js";

export class ToppingService extends ApiService{
   async getAll():Promise<Topping[]>{
        const data:Topping[] = await this.get('/toppings');
        return data.map((t:Topping)=>new Topping(t.id, t.name, t.price));
    }
    async getById(id:string):Promise<Topping>{
           const data:Topping = await this.get<Topping>(`/toppings/${id}`);
           return new Topping(data.id, data.name, data.price);
        }
    
        async create(t:Topping):Promise<Topping>{
            const data:any = await this.post<Topping>(`/toppings`, t);
            console.log(data);
            return data;
        }
         async edit(t:Topping):Promise<Topping>{
            const data:any = await this.update<Topping>(`/toppings/${t.id}`, t);
            console.log(data);
            return data;
        }
    async remove(id:string):Promise<Topping>{
            const data:Topping = await this.delete<Topping>(`/toppings/${id}`);
            console.log(data);
            return data;
        }
}   