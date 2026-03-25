import { CartItem } from "../models/CartItem.js";
import type { Product } from "../models/Product.js";
import { Topping } from "../models/Topping.js";
import { ProductService } from "../services/ProductService.js";
import { ToppingService } from "../services/ToppingService.js";
import { ProductDetailView } from "../views/ProductDetailView.js";

export class ProductDetailController{
    private productService = new ProductService();
    private toppingService = new ToppingService();
    private view = new ProductDetailView();

    private product: Product | null = null
    private toppings:Topping[] = [];

    private total:number = 0;
    private selectedToppings:Topping[] = [];

  async  init(){
     const urlParams:URLSearchParams = new URLSearchParams(window.location.search);
     const productId:string|null = urlParams.get('id');

     if(!productId){
        alert('Không tìm thấy sản phẩm');
        window.location.href = 'index.html';
        return;
     }
     this.product = await this.productService.getById(productId);
     this.toppings = await this.toppingService.getAll(); // cần tạo ToppingService
     this.render();
     this.addEvents();
    }

    private render():void{
        if(!this.product){
            return;
        }
     document.querySelector('#main')!.innerHTML = this.view.render(this.product, this.toppings);
    }

    private addEvents():void{
        const checkboxList:NodeListOf<HTMLInputElement> = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"');
        console.log(checkboxList);
        
    this.total = this.product?.price || 0;

        checkboxList.forEach((cb:HTMLInputElement)=> (
            cb.addEventListener('change', (e:Event)=> {
             const input:HTMLInputElement = (e.target as HTMLInputElement);
             if(input.checked){
                this.total += Number(input.dataset.price);
                if(input.dataset.id && input.dataset.name && input.dataset.price){
                    this.selectedToppings.push(new Topping(input.dataset.id, input.dataset.name, Number(input.dataset.price)));
                }
             }else{
                this.total -= Number(input.dataset.price);
                this.selectedToppings = this.selectedToppings.filter((t:Topping)=>t.id!=input.dataset.id);
             }
             document.querySelector('#product-price')!.innerHTML = this.total.toLocaleString('vi-VN')+ 'đ';
             console.log(this.total, this.selectedToppings);
            })
        ));
        document.querySelector('#add-to-cart')?.addEventListener('click',()=>this.addToCart());
    }

    private addToCart():void{
    if(!this.product) return; // Nếu không có sản phẩm >> không xư lý nữa

        let cart:CartItem[] = [];
        if(localStorage.getItem('cart-TS')){
            // Đã có giỏ hàng 
            cart = JSON.parse(localStorage.getItem('cart-TS')||"[]").map((item:CartItem)=>new CartItem(item.product,
            item.toppings, item.quantity));
        }

        // Thêm sản phẩm vào giỏ hàng
        let newItem:CartItem = new CartItem(this.product, this.selectedToppings, 1);
        let inCart:boolean = false;
        // TH1: Chưa có sản phẩm >> Thêm vào với quantity = 1
        cart.forEach((item:CartItem)=>{
            if(CartItem.isTheSame(newItem,item)){
                item.quantity++;
                inCart = true;
            }
        })
        // TH2: Đã có sản phẩm >> Thêm vào với quantity = 1
        if(!inCart){
            cart.push(newItem);
        }
        localStorage.setItem('cart-TS', JSON.stringify(cart));
    }
}