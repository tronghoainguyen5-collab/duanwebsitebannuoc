import type { CartItem } from "./CartItem.js";
import type { User } from "./User.js";

export class Order{
    id:string|undefined;
    createDate:Date;
    total:number
    user:User;
    items:CartItem[];
    status:'pending'|'shipping'|'success'|'cancel';

    constructor(id:string|undefined, createDate:Date, total:number,
         user:User, items:CartItem[], status:'pending'|'shipping'|'success'|'cancel'){
        this.id = id;
        this.createDate = createDate;
        this.total = total;
        this.user = user;
        this.items = items;
        this.status = status;
    }
}