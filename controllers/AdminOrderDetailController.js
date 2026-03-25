import { OrderService } from "../services/OrderService.js";
import { AdminOrderDetailView } from "../views/AdminOrderDetailView.js";
import { AdminOrderView } from "../views/AdminOrderView.js";
import { AdminProductView } from "../views/AdminProductView.js";
export class AdminOrderDetailController {
    constructor() {
        this.view = new AdminOrderDetailView();
        this.orderService = new OrderService();
    }
    async init() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (!id) {
            alert('Mã đơn hàng không tồn tại!');
            location.href = 'admin-order.html';
        }
        else {
            await this.render(id);
            this.attachEvent();
        }
    }
    async render(id) {
        this.order = await this.orderService.getById(id); // Xây dựng thêm CategoryService kế thừa từ ApiService để tạo và gọi hàm getAll()
        document.querySelector('#main').innerHTML = this.view.renderOrder(this.order);
    }
    attachEvent() {
        var _a, _b;
        (_a = document.querySelector('#btn-confirm')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
            if (this.order) {
                if (this.order.status == 'pending') {
                    this.order.status = 'shipping';
                }
                else if (this.order.status == 'shipping') {
                    this.order.status = 'success';
                }
                this.orderService.edit(this.order);
            }
        });
        (_b = document.querySelector('#btn-cancel')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
            if (this.order) {
                this.order.status = 'cancel';
                this.orderService.edit(this.order);
            }
        });
    }
}
// !. kiểm tra có tồn tại phần tử đó hay không trước khi gán giá trị cho nó
//# sourceMappingURL=AdminOrderDetailController.js.map