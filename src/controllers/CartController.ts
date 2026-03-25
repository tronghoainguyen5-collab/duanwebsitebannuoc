import type { CartItem } from "../models/CartItem.js";
import { Order } from "../models/Order.js";
import { User } from "../models/User.js";
import { CartService } from "../services/CartService.js";
import { OrderService } from "../services/OrderService.js";
import { CartView } from "../views/CartView.js";

export class CartController{
    private cartService = CartService.getInstance();
    private orderService = OrderService.getInstance();
    private view = new CartView();

    init():void{
        this.render();
        this.attachEvents();
    }

    private render():void{
        const items:CartItem[] = this.cartService.getItems();
        const total:number = this.cartService.getTotalPrice();
        const container:Element|null = document.querySelector('#cart-container');
        if(container){
            container.innerHTML = this.view.render(items, total);
        }
    }

    private attachEvents():void{
        document.addEventListener('click', (e:Event)=>{
            const target:HTMLElement = e.target as HTMLElement;
            if(target.classList.contains('quantity')){
                let id:string|undefined = target.dataset.id;
                if(id){
                this.cartService.updateQuantity(id, Number((target as HTMLInputElement).value));
                this.render();
                }
            }

            if(target.classList.contains('remove-item')){
                let id:string|undefined = target.dataset.id;
                if(id){
                    this.cartService.removeItem(id);
                    this.render();
                }
            }

            if(target.id == 'clear-cart'){
                    this.cartService.clearCart();
                    this.render();
            }
        });

        document.querySelector('#order-form')?.addEventListener('submit', async (e:Event)=>{
            e.preventDefault();
            let name:string = (document.querySelector('#fullname') as HTMLInputElement).value;
            let phone:string = (document.querySelector('#phone') as HTMLInputElement).value;
            let address:string = (document.querySelector('#address') as HTMLInputElement).value;
            const items:CartItem[] = this.cartService.getItems();
            const total:number = this.cartService.getTotalPrice();

           let res:any = await this.orderService.create(
            new Order(
                undefined,
                new Date(),
                total,
                new User("0","","",phone,name,address,"user"),
                items,
                'pending'
            )
        );
            if( res){
                alert("Đặt hàng thành công!!!");
                this.cartService.clearCart();
                this.render();
            }else{
                alert('Có lỗi xảy ra trong quá trình đặt hàng. Vui lòng kiểm tra và thử lại!!!')
            }
        });
    }
}