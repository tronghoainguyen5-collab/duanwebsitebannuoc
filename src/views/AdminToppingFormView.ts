import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import type { Topping } from "../models/Topping.js";

export class AdminToppingFormView{
    renderForm(topping: Topping | null):string {
        if(topping){
            return `
          <h2 class="mb-4">Sửa topping</h2>
      <form id="topping-form">
            <div class="mb-3">
              <label for="toppingName" class="form-label">Tên topping</label>
              <input
                type="text"
                id="name"
                class="form-control"
                placeholder="Nhập tên topping"
                value="${topping.name}"
                required
              />
            </div>
            <div class="mb-3">
              <label for="toppingPrice" class="form-label">Giá (VNĐ)</label>
              <input
                type="number"
                id="price"
                class="form-control"
                placeholder="Nhập giá topping"
                value="${topping.price}"
                required
              />
            </div>
            <button type="submit" class="btn btn-warning">Lưu topping</button>
            <a href="admin-topping.html" class="btn btn-outline-secondary"
              >Hủy</a
            >
          </form>
        `
        }

        return `<h2 class="mb-4">Thêm topping</h2>
      <form id="topping-form">
            <div class="mb-3">
              <label for="name" class="form-label">Tên topping</label>
              <input
                type="text"
                id="name"
                class="form-control"
                placeholder="Nhập tên topping"
                required
              />
            </div>
            <div class="mb-3">
              <label for="price" class="form-label">Giá (VNĐ)</label>
              <input
                type="number"
                id="price"
                class="form-control"
                placeholder="Nhập giá topping"
                required
              />
            </div>
            <button type="submit" class="btn btn-warning">Lưu topping</button>
            <a href="admin-topping.html" class="btn btn-outline-secondary"
              >Hủy</a
            >
          </form>`
    }
}
// join('') chuyển mảng thành chuỗi