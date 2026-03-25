import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";

export class HomeView{
    renderProducts(products: Product[]):string {
        if(products.length == 0){
            return `<div>Đang tải sản phẩm...</div>`
        }

        return products.map((p:Product)=>`
        <div class="col-md-3">
          <div class="card">
            <img
              src="public/img/${p.image}"
              class="card-img-top"
              alt="${p.name}"
            />
            <div class="card-body text-center">
              <h5 class="card-title">${p.name}</h5>
              <p class="card-text">${p.price.toLocaleString("vi-VN")}</p>
              <a href="product.html?id=${p.id}" class="btn btn-warning"
                >Xem chi tiết</a
              >
            </div>
          </div>
        </div>
        `).join('')
    }

    renderCategories(categories: Category[], products: Product[]):string {
        if(categories.length == 0){
            return `<div>Đang tải danh mục sản phẩm...</div>`
        }
        return categories.map((c:Category)=>{
            let productInCategory:Product[] = products.filter((p:Product)=> p.category_id == c.id)
            return `
        <h2 class="category-title">${c.name}</h2>
      <div class="row g-4">
        ${this.renderProducts(productInCategory)}
      </div>
      `}).join('')  
    }
}
// join('') chuyển mảng thành chuỗi