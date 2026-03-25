import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import { Topping } from "../models/Topping.js";
import { CategoryService } from "../services/CategoryService.js";
import { ProductService } from "../services/ProductService.js";
import { ToppingService } from "../services/ToppingService.js";
import { AdminToppingFormView } from "../views/AdminToppingFormView.js";
// import { AdminProductView } from "../views/AdminProductView.js";

export class AdminToppingFormController{
    private view = new AdminToppingFormView();
    private toppingService = new ToppingService();
    private categoryService = new CategoryService();

    public async init(){
        const urlParams:URLSearchParams = new URLSearchParams(window.location.search);
        const toppingId:string|null = urlParams.get('id');
    await this.render(toppingId);
    await this.attachEvents(toppingId);
    }

   async render(id:string|null){
        // let categories:Category[] = await this.categoryService.getAll(); 
        if(!id){
            // Không có id => Thêm topping mới
            document.querySelector('#main')!.innerHTML = this.view.renderForm(null);
        }else{
        let topping:Topping = await this.toppingService.getById(id); 
        document.querySelector('#main')!.innerHTML = this.view.renderForm(topping);
    }
  } 

  attachEvents(id:string|null):void{
    document.querySelector('#topping-form')?.addEventListener('submit', async (e:Event)=>{
        e.preventDefault();
        let name:string = (document.querySelector('#name') as HTMLInputElement).value;
        let price:string = (document.querySelector('#price') as HTMLInputElement).value;
        if(!id){
            // Không có id >> Thêm topping
           await this.toppingService.create(new Topping(undefined, name, Number(price)));
                alert('Đã thêm topping');
                location.href= 'admin-topping.html'
        }else{
            // Có id >> Sửa topping
            await this.toppingService.edit(new Topping(id, name, Number(price)));
            alert('Thông tin topping đã được lưu lại');
        }
    })
  }

}
// !. kiểm tra có tồn tại phần tử đó hay không trước khi gán giá trị cho nó