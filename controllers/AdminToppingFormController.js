import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import { Topping } from "../models/Topping.js";
import { CategoryService } from "../services/CategoryService.js";
import { ProductService } from "../services/ProductService.js";
import { ToppingService } from "../services/ToppingService.js";
import { AdminToppingFormView } from "../views/AdminToppingFormView.js";
// import { AdminProductView } from "../views/AdminProductView.js";
export class AdminToppingFormController {
    constructor() {
        this.view = new AdminToppingFormView();
        this.toppingService = new ToppingService();
        this.categoryService = new CategoryService();
    }
    async init() {
        const urlParams = new URLSearchParams(window.location.search);
        const toppingId = urlParams.get('id');
        await this.render(toppingId);
        await this.attachEvents(toppingId);
    }
    async render(id) {
        // let categories:Category[] = await this.categoryService.getAll(); 
        if (!id) {
            // Không có id => Thêm topping mới
            document.querySelector('#main').innerHTML = this.view.renderForm(null);
        }
        else {
            let topping = await this.toppingService.getById(id);
            document.querySelector('#main').innerHTML = this.view.renderForm(topping);
        }
    }
    attachEvents(id) {
        var _a;
        (_a = document.querySelector('#topping-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', async (e) => {
            e.preventDefault();
            let name = document.querySelector('#name').value;
            let price = document.querySelector('#price').value;
            if (!id) {
                // Không có id >> Thêm topping
                await this.toppingService.create(new Topping(undefined, name, Number(price)));
                alert('Đã thêm topping');
                location.href = 'admin-topping.html';
            }
            else {
                // Có id >> Sửa topping
                await this.toppingService.edit(new Topping(id, name, Number(price)));
                alert('Thông tin topping đã được lưu lại');
            }
        });
    }
}
// !. kiểm tra có tồn tại phần tử đó hay không trước khi gán giá trị cho nó
//# sourceMappingURL=AdminToppingFormController.js.map