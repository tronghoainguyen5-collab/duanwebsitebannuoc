import { CartItem } from "../models/CartItem.js";

export class CartService {
    private static instance: CartService;
    private items:CartItem[] = [];

    constructor(){
        this.loadFromStorage();
    }

    getItems():CartItem[]{
        return this.items;
    }

    static getInstance():CartService{
        if(!CartService.instance){
            CartService.instance = new CartService();
        }
        return CartService.instance
    }

    addItem(item: CartItem):void{
        let inCart:boolean = false;
        // TH1: Chưa có sản phẩm >> Thêm vào với quantity = 1
        this.items.forEach((i:CartItem)=>{
            if(CartItem.isTheSame(item,i)){
                i.quantity++;
                inCart = true;
            }
        })
        // TH2: Đã có sản phẩm >> Thêm vào với quantity = 1
        if(!inCart){
            this.items.push(item);
        }
        // lưu lại vào localStorager
        this.saveToStorage();
    }

    removeItem(id:string):void{
        this.items = this.items.filter((item:CartItem)=>item.product.id != id);
        this.saveToStorage();
    }

    updateQuantity(id:string, quantity:number):void{
         if(quantity <= 0){
            // this.removeItem(id);
         }else{
            this.items.find((item:CartItem)=>item.product.id==id)!.quantity = quantity;
         }
         this.saveToStorage();
    }

    getTotalPrice():number{
        return this.items.reduce((sum:number, item:CartItem)=> sum + item.getTotal(),0);
    }

    clearCart():void{
        this.items = [];
        this.saveToStorage();
    }

    private saveToStorage():void{
        localStorage.setItem('cart-TS', JSON.stringify(this.items));
    }

    private loadFromStorage():void{
        const data = localStorage.getItem('cart-TS');
        if(data){
            this.items = JSON.parse(data).map((item:CartItem)=>new CartItem(item.product,item.toppings,item.quantity));
        }
    }
}