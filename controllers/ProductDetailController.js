import { CartItem } from "../models/CartItem.js";
import { Topping } from "../models/Topping.js";
import { ProductService } from "../services/ProductService.js";
import { ToppingService } from "../services/ToppingService.js";
import { ProductDetailView } from "../views/ProductDetailView.js";
export class ProductDetailController {
    constructor() {
        this.productService = new ProductService();
        this.toppingService = new ToppingService();
        this.view = new ProductDetailView();
        this.product = null;
        this.toppings = [];
        this.total = 0;
        this.selectedToppings = [];
    }
    async init() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (!productId) {
            alert('Không tìm thấy sản phẩm');
            window.location.href = 'index.html';
            return;
        }
        this.product = await this.productService.getById(productId);
        this.toppings = await this.toppingService.getAll(); // cần tạo ToppingService
        this.render();
        this.addEvents();
    }
    render() {
        if (!this.product) {
            return;
        }
        document.querySelector('#main').innerHTML = this.view.render(this.product, this.toppings);
    }
    addEvents() {
        var _a, _b;
        const checkboxList = document.querySelectorAll('input[type="checkbox"');
        console.log(checkboxList);
        this.total = ((_a = this.product) === null || _a === void 0 ? void 0 : _a.price) || 0;
        checkboxList.forEach((cb) => (cb.addEventListener('change', (e) => {
            const input = e.target;
            if (input.checked) {
                this.total += Number(input.dataset.price);
                if (input.dataset.id && input.dataset.name && input.dataset.price) {
                    this.selectedToppings.push(new Topping(input.dataset.id, input.dataset.name, Number(input.dataset.price)));
                }
            }
            else {
                this.total -= Number(input.dataset.price);
                this.selectedToppings = this.selectedToppings.filter((t) => t.id != input.dataset.id);
            }
            document.querySelector('#product-price').innerHTML = this.total.toLocaleString('vi-VN') + 'đ';
            console.log(this.total, this.selectedToppings);
        })));
        (_b = document.querySelector('#add-to-cart')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => this.addToCart());
    }
    addToCart() {
        if (!this.product)
            return; // Nếu không có sản phẩm >> không xư lý nữa
        let cart = [];
        if (localStorage.getItem('cart-TS')) {
            // Đã có giỏ hàng 
            cart = JSON.parse(localStorage.getItem('cart-TS') || "[]").map((item) => new CartItem(item.product, item.toppings, item.quantity));
        }
        // Thêm sản phẩm vào giỏ hàng
        let newItem = new CartItem(this.product, this.selectedToppings, 1);
        let inCart = false;
        // TH1: Chưa có sản phẩm >> Thêm vào với quantity = 1
        cart.forEach((item) => {
            if (CartItem.isTheSame(newItem, item)) {
                item.quantity++;
                inCart = true;
            }
        });
        // TH2: Đã có sản phẩm >> Thêm vào với quantity = 1
        if (!inCart) {
            cart.push(newItem);
        }
        localStorage.setItem('cart-TS', JSON.stringify(cart));
    }
}
//# sourceMappingURL=ProductDetailController.js.map