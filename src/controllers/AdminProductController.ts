import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import { CategoryService } from "../services/CategoryService.js";
import { ProductService } from "../services/ProductService.js";
import { AdminProductView } from "../views/AdminProductView.js";

export class AdminProductController{
    private view = new AdminProductView();
    private productService = new ProductService();
    private categoryService = new CategoryService();

    public async init(){
    await this.render();
     this.attachEvent();
    }

   async render(){
        let categories:Category[] = await this.categoryService.getAll(); // Xây dựng thêm CategoryService kế thừa từ ApiService để tạo và gọi hàm getAll()
        let products:Product[] = await this.productService.getAll(); // Xây dựng thêm ProductService kế thừa từ ApiService để tạo và gọi hàm getAll()
        document.querySelector('table tbody')!.innerHTML = this.view.renderProducts(products, categories);
    }

    attachEvent():void{
        document.querySelectorAll('.btn-delete').forEach((btn:Element)=>{
            btn.addEventListener('click', async (e:Event)=>{
                let id:string = (e.target as HTMLButtonElement).dataset.id||"";
                let ok:boolean = confirm("Bạn có muốn xóa sản phẩm này không");
                if(ok){
                await this.productService.remove(id);
                alert('Đã xóa sản phẩm');
                }
            })
        });
    }
}
// !. kiểm tra có tồn tại phần tử đó hay không trước khi gán giá trị cho nó