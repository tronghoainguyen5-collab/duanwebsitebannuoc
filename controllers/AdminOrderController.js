import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import { OrderService } from "../services/OrderService.js";
import { AdminOrderView } from "../views/AdminOrderView.js";
import { AdminProductView } from "../views/AdminProductView.js";
export class AdminOrderController {
    constructor() {
        this.view = new AdminOrderView();
        this.orderService = new OrderService();
    }
    async init() {
        await this.render();
        this.attachEvent();
    }
    async render() {
        let orders = await this.orderService.getAll(); // Xây dựng thêm CategoryService kế thừa từ ApiService để tạo và gọi hàm getAll()
        document.querySelector('table tbody').innerHTML = this.view.renderOrders(orders);
    }
    attachEvent() {
    }
}
// !. kiểm tra có tồn tại phần tử đó hay không trước khi gán giá trị cho nó
//# sourceMappingURL=AdminOrderController.js.map