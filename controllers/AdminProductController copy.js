import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import { CategoryService } from "../services/CategoryService.js";
import { ProductService } from "../services/ProductService.js";
import { AdminProductView } from "../views/AdminProductView.js";
export class AdminProductController {
    constructor() {
        this.view = new AdminProductView();
        this.productService = new ProductService();
        this.categoryService = new CategoryService();
    }
    async init() {
        await this.render();
        this.attachEvent();
    }
    async render() {
        let categories = await this.categoryService.getAll(); // Xây dựng thêm CategoryService kế thừa từ ApiService để tạo và gọi hàm getAll()
        let products = await this.productService.getAll(); // Xây dựng thêm ProductService kế thừa từ ApiService để tạo và gọi hàm getAll()
        document.querySelector('table tbody').innerHTML = this.view.renderProducts(products, categories);
    }
    attachEvent() {
        document.querySelectorAll('.btn-delete').forEach((btn) => {
            btn.addEventListener('click', async (e) => {
                let id = e.target.dataset.id || "";
                let ok = confirm("Bạn có muốn xóa sản phẩm này không");
                if (ok) {
                    await this.productService.remove(id);
                    alert('Đã xóa sản phẩm');
                }
            });
        });
    }
}
// !. kiểm tra có tồn tại phần tử đó hay không trước khi gán giá trị cho nó
//# sourceMappingURL=AdminProductController%20copy.js.map