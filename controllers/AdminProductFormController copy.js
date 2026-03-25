import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import { CategoryService } from "../services/CategoryService.js";
import { ProductService } from "../services/ProductService.js";
import { AdminProductFormView } from "../views/AdminProductFormView.js";
// import { AdminProductView } from "../views/AdminProductView.js";
export class AdminProductFormController {
    constructor() {
        this.view = new AdminProductFormView();
        this.productService = new ProductService();
        this.categoryService = new CategoryService();
    }
    async init() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        await this.render(productId);
        await this.attachEvents(productId);
    }
    async render(id) {
        let categories = await this.categoryService.getAll();
        if (!id) {
            // Không có id => Thêm sản phẩm mới
            document.querySelector('#main').innerHTML = this.view.renderForm(null, categories);
        }
        else {
            let product = await this.productService.getById(id);
            document.querySelector('#main').innerHTML = this.view.renderForm(product, categories);
        }
    }
    attachEvents(id) {
        var _a;
        (_a = document.querySelector('#product-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', async (e) => {
            e.preventDefault();
            let name = document.querySelector('#name').value;
            let price = document.querySelector('#price').value;
            let image = document.querySelector('#image').value;
            let category_id = document.querySelector('#category_id').value;
            let description = document.querySelector('#description').value;
            if (!id) {
                // Không có id >> Thêm sản phẩm
                await this.productService.create(new Product(undefined, name, Number(price), image, description, category_id));
                alert('Đã thêm sản phẩm');
                location.href = 'admin-product.html';
            }
            else {
                // Có id >> Sửa sản phẩm
                await this.productService.edit(new Product(id, name, Number(price), image, description, category_id));
                alert('Thông tin sản phẩm đã được lưu lại');
            }
        });
    }
}
// !. kiểm tra có tồn tại phần tử đó hay không trước khi gán giá trị cho nó
//# sourceMappingURL=AdminProductFormController%20copy.js.map