import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import { CategoryService } from "../services/CategoryService.js";
import { ProductService } from "../services/ProductService.js";
import { HomeView } from "../views/HomeView.js";
export class HomeController {
    constructor() {
        this.view = new HomeView();
        this.productService = new ProductService();
        this.categoryService = new CategoryService();
    }
    async init() {
        await this.categoryService.init(); // ⚠️ BẮT BUỘC
        await this.productService.init(); // ⚠️ thêm luôn cho chắc
        await this.render();
    }
    async render() {
        let categories = await this.categoryService.getAll(); // Xây dựng thêm CategoryService kế thừa từ ApiService để tạo và gọi hàm getAll()
        let products = await this.productService.getAll(); // Xây dựng thêm ProductService kế thừa từ ApiService để tạo và gọi hàm getAll()
        document.querySelector('#main').innerHTML = this.view.renderCategories(categories, products);
    }
}
// !. kiểm tra có tồn tại phần tử đó hay không trước khi gán giá trị cho nó
//# sourceMappingURL=HomeController.js.map