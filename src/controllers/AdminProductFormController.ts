import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import { CategoryService } from "../services/CategoryService.js";
import { ProductService } from "../services/ProductService.js";
import { AdminProductFormView } from "../views/AdminProductFormView.js";
// import { AdminProductView } from "../views/AdminProductView.js";

export class AdminProductFormController{
    private view = new AdminProductFormView();
    private productService = new ProductService();
    private categoryService = new CategoryService();

    public async init(){
        const urlParams:URLSearchParams = new URLSearchParams(window.location.search);
        const productId:string|null = urlParams.get('id');
    await this.render(productId);
    await this.attachEvents(productId);
    }

   async render(id:string|null){
        let categories:Category[] = await this.categoryService.getAll(); 
        if(!id){
            // Không có id => Thêm sản phẩm mới
            document.querySelector('#main')!.innerHTML = this.view.renderForm(null, categories);
        }else{
        let product:Product = await this.productService.getById(id); 
        document.querySelector('#main')!.innerHTML = this.view.renderForm(product, categories);
    }
  } 

  attachEvents(id:string|null):void{
    document.querySelector('#product-form')?.addEventListener('submit', async (e:Event)=>{
        e.preventDefault();
        let name:string = (document.querySelector('#name') as HTMLInputElement).value;
        let price:string = (document.querySelector('#price') as HTMLInputElement).value;
        let image:string = (document.querySelector('#image') as HTMLInputElement).value;
        let category_id:string = (document.querySelector('#category_id') as HTMLInputElement).value;
        let description:string = (document.querySelector('#description') as HTMLInputElement).value;

        if(!id){
            // Không có id >> Thêm sản phẩm
           await this.productService.create(new Product(undefined,
                name,Number(price), image, description, category_id));
                alert('Đã thêm sản phẩm');
                location.href= 'admin-product.html'
        }else{
            // Có id >> Sửa sản phẩm
            await this.productService.edit(new Product(id,name,Number(price), image, description, category_id));
            alert('Thông tin sản phẩm đã được lưu lại');
        }
    })
  }

}
// !. kiểm tra có tồn tại phần tử đó hay không trước khi gán giá trị cho nó