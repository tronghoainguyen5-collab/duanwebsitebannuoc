import { Order } from "../models/Order.js";
import { User } from "../models/User.js";
import { CartService } from "../services/CartService.js";
import { OrderService } from "../services/OrderService.js";
import { CartView } from "../views/CartView.js";
export class CartController {
    constructor() {
        this.cartService = CartService.getInstance();
        this.orderService = OrderService.getInstance();
        this.view = new CartView();
    }
    init() {
        this.render();
        this.attachEvents();
    }
    render() {
        const items = this.cartService.getItems();
        const total = this.cartService.getTotalPrice();
        const container = document.querySelector('#cart-container');
        if (container) {
            container.innerHTML = this.view.render(items, total);
        }
    }
    attachEvents() {
        var _a;
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('quantity')) {
                let id = target.dataset.id;
                if (id) {
                    this.cartService.updateQuantity(id, Number(target.value));
                    this.render();
                }
            }
            if (target.classList.contains('remove-item')) {
                let id = target.dataset.id;
                if (id) {
                    this.cartService.removeItem(id);
                    this.render();
                }
            }
            if (target.id == 'clear-cart') {
                this.cartService.clearCart();
                this.render();
            }
        });
        (_a = document.querySelector('#order-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', async (e) => {
            e.preventDefault();
            let name = document.querySelector('#fullname').value;
            let phone = document.querySelector('#phone').value;
            let address = document.querySelector('#address').value;
            const items = this.cartService.getItems();
            const total = this.cartService.getTotalPrice();
            let res = await this.orderService.create(new Order(undefined, new Date(), total, new User("0", "", "", phone, name, address, "user"), items, 'pending'));
            if (res) {
                alert("Đặt hàng thành công!!!");
                this.cartService.clearCart();
                this.render();
            }
            else {
                alert('Có lỗi xảy ra trong quá trình đặt hàng. Vui lòng kiểm tra và thử lại!!!');
            }
        });
    }
}
//# sourceMappingURL=CartController.js.map