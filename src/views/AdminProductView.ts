import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";

export class AdminProductView{
    renderProducts(products: Product[], categories:Category[]):string {
        if(products.length == 0){
            return `<div>Đang tải sản phẩm...</div>`
        }

        return products.map((p:Product,index:number)=>`
        <tr>
                <td>${index+1}</td>
                <td>
                  <img src="public/img/${p.image}" alt="${p.name}" width="64"/>
                  ${p.name}
                </td>
                <td class="text-end">${p.price.toLocaleString('vi-VN')}đ</td>
                <td>${categories.find((c:Category)=>c.id==p.category_id)?.name}</td>
                <td>
                  <a
                    href="admin-product-form.html?id=${p.id}" class="btn btn-sm btn-warning">Sửa</a>
                  <button class="btn btn-sm btn-danger btn-delete" data-id="${p.id}">Xóa</button>
                </td>
              </tr>
        `).join('')
    }
}
// join('') chuyển mảng thành chuỗi