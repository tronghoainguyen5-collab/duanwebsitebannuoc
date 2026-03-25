import type { Product } from "./Product.js";
import type { Topping } from "./Topping.js";

export class CartItem{
    public product:Product;
    public toppings:Topping[];
    public quantity:number;

    constructor(product:Product, toppings:Topping[], quantity:number = 1){
        this.product = product;
        this.toppings = toppings;
        this.quantity = quantity;
    }

    getTotal():number{
        const toppingPrice = this.toppings.reduce((sum:number, t:Topping)=> sum + t.price, 0);
        return (this.product.price + toppingPrice) * this.quantity;
    }

    getToppingNames(): string{
        return this.toppings.length == 0 ? 'Không có topping' : this.toppings.map((t:Topping)=>t.name).join(', ');
    }
    static isTheSame(item1:CartItem, item2:CartItem){
        // TH1: 2 sản phẩm khác nhau (khác id)
        if(item1.product.id != item2.product.id) return false;
        // TH2: 2 sản phẩm có số lượng topping khác nhau
        if(item1.toppings.length != item2.toppings.length) return false;
        // TH3: 2 sản phẩm giống nhau về số lượng topping  -> Kiểm tra từng loại topping có giống nhau không
        item1.toppings.forEach((t1:Topping)=>{
        // Trà đào (trân châu đen + trân châu trắng) != Trà đào (trân châu đen + thạch lá dứa) >> return false
            if(!item2.toppings.some((t2:Topping)=>t2.id == t1.id)) return false
        });
        // Trà đào (trân châu đen + trân châu trắng) == Trà đào (trân châu trắng + trân châu đen) >> return true
        return true
    }
}
//Trà đào cam xả + không topping
// Trà đào cam xả + Trân châu trắng + Trân châu đen x2