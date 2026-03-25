import { CartItem } from "../models/CartItem.js";
import { Order } from "../models/Order.js";
import { ApiService } from "./ApiService.js";

export class OrderService extends ApiService{
    private static instance: OrderService;
    static getInstance():OrderService{
        if(!OrderService.instance){
            OrderService.instance = new OrderService();
        }
        return OrderService.instance;
    }

    async getAll():Promise<Order[]>{
            const data:Order[] = await this.get<Order[]>('/orders');
            return data.map((o:Order)=>new Order(o.id,o.createDate,o.total,o.user,o.items,o.status));
        }

        async getLimit(limit:number):Promise<Order[]>{
            const data:Order[] = await this.get<Order[]>(`/orders?_sort-createDate&_limit=${limit}`);
            return data.map((o:Order)=>new Order(o.id,o.createDate,o.total,o.user,o.items,o.status)).slice(0,limit);
        }
    
       async getById(id:string):Promise<Order>{
           const data:Order = await this.get<Order>(`/orders/${id}`);
           return new Order(data.id,data.createDate,data.total,data.user,
           data.items.map((i)=>new CartItem(i.product,i.toppings,i.quantity)),
           data.status);
        }
   async create(order:Order):Promise<Order>{
        const data = await this.post<Order>('/orders', order);
        return new Order(
            data.id,
            data.createDate,
            data.total,
            data.user,
            data.items,
            data.status,
        )
    }

     async edit(order:Order):Promise<Order>{
        const data = await this.update<Order>(`/orders/${order.id}`, order);
        return new Order(
            data.id,
            data.createDate,
            data.total,
            data.user,
            data.items,
            data.status,
        )
    }
}