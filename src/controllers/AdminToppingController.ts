import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import type { Topping } from "../models/Topping.js";
import { CategoryService } from "../services/CategoryService.js";
import { ProductService } from "../services/ProductService.js";
import { ToppingService } from "../services/ToppingService.js";
import { AdminProductView } from "../views/AdminProductView.js";
import { AdminToppingView } from "../views/AdminToppingView.js";

export class AdminToppingController{
    private view = new AdminToppingView();
    private toppingService = new ToppingService();

    public async init(){
    await this.render();
     this.attachEvent();
    }

   async render(){
        let toppings:Topping[] = await this.toppingService.getAll(); // Xây dựng thêm CategoryService kế thừa từ ApiService để tạo và gọi hàm getAll()
        // let products:Product[] = await this.productService.getAll(); // Xây dựng thêm ProductService kế thừa từ ApiService để tạo và gọi hàm getAll()
        document.querySelector('table tbody')!.innerHTML = this.view.renderToppings(toppings);
    }

    attachEvent():void{
        document.querySelectorAll('.btn-danger').forEach((btn:Element)=>{
            btn.addEventListener('click', async (e:Event)=>{
                let id:string = (e.target as HTMLButtonElement).dataset.id||"";
                let ok:boolean = confirm("Bạn có muốn xóa topping này không");
                if(ok){
                await this.toppingService.remove(id);
                alert('Đã xóa topping thành công');
                this.render();
                }
            })
        });
    }
}
// !. kiểm tra có tồn tại phần tử đó hay không trước khi gán giá trị cho nó