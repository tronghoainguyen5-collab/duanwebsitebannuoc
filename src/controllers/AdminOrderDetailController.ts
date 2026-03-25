import type { Order } from "../models/Order.js";
import { OrderService } from "../services/OrderService.js";
import { AdminOrderDetailView } from "../views/AdminOrderDetailView.js";
import { AdminOrderView } from "../views/AdminOrderView.js";
import { AdminProductView } from "../views/AdminProductView.js";

export class AdminOrderDetailController{
    private view = new AdminOrderDetailView();
    private orderService = new OrderService();
    private order:Order | undefined;

    public async init(){
    const urlParams:URLSearchParams = new URLSearchParams(window.location.search);
     const id:string|null = urlParams.get('id');
     if(!id){
        alert('Mã đơn hàng không tồn tại!')
        location.href = 'admin-order.html';
     }else{
     await this.render(id);
     this.attachEvent();  
     }
    }

   async render(id:string){
        this.order = await this.orderService.getById(id); // Xây dựng thêm CategoryService kế thừa từ ApiService để tạo và gọi hàm getAll()
        document.querySelector('#main')!.innerHTML = this.view.renderOrder(this.order);
    }

    attachEvent():void{
            document.querySelector('#btn-confirm')?.addEventListener('click', (e:Event)=>{
                if(this.order){
                if(this.order.status=='pending') 
                {
                     this.order.status = 'shipping';
                }
                else if(this.order.status=='shipping') {
                    this.order.status = 'success'
                }
                this.orderService.edit(this.order);
                }
        });
        document.querySelector('#btn-cancel')?.addEventListener('click', (e:Event)=>{
            if(this.order){
                this.order.status = 'cancel';
                this.orderService.edit(this.order);
            }
        });
}
}
// !. kiểm tra có tồn tại phần tử đó hay không trước khi gán giá trị cho nó