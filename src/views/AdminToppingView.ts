import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import type { Topping } from "../models/Topping.js";

export class AdminToppingView{
    renderToppings(toppings: Topping[]):string {
        if(toppings.length == 0){
            return `<div>Đang tải topping...</div>`
        }

        return toppings.map((t:Topping,index:number)=>`
         <tr>
                <td>${t.id}</td>
                <td>${t.name}</td>
                <td class="text-end">${t.price.toLocaleString('vi-VN')}đ</td>
                <td>
                  <a
                    href="admin-topping-form.html?id=${t.id}"
                    class="btn btn-sm btn-warning"
                    >Sửa</a
                  >
                  <button class="btn btn-sm btn-danger" data-id="${t.id}">Xóa</button>
                </td>
              </tr>
        `).join('')
    }
}
// join('') chuyển mảng thành chuỗi