import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";

export class AdminProductFormView{
    renderForm(product: Product | null, categories:Category[]):string {
        if(product){
            return `
          <h2>Sửa sản phẩm</h2>
      <form id="product-form">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Tên sản phẩm</label>
            <input type="text" id="name" class="form-control" placeholder="Nhập tên sản phẩm" value="${product.name}" />
          </div>
          <div class="col-md-6">
            <label class="form-label">Giá (VNĐ)</label>
            <input type="number" id="price" class="form-control" placeholder="Nhập giá" value="${product.price}" />
          </div>
          <div class="col-md-6">
            <label class="form-label">Ảnh sản phẩm</label>
            <img src="public/img/${product.image}" class="float-end" width="64"/>
            <input type="file" id="image" class="form-control" />
          </div>
          <div class="col-md-6">
            <label class="form-label">Danh mục</label>
            <select id="category_id" class="form-select">
            ${categories.map((c:Category)=>`<option value="${c.id}" ${c.id==product.category_id?'selected':''}>${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="col-12">
            <label class="form-label">Mô tả</label>
            <textarea id="description" class="form-control" rows="3" placeholder="Nhập mô tả sản phẩm">${product.description}</textarea>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-warning">
              Lưu sản phẩm
            </button>
            <a href="admin-product.html" class="btn btn-outline-secondary"
              >Hủy</a
            >
          </div>
        </div>
      </form>
        `
        }

        return `<h2>Thêm sản phẩm</h2>
      <form id="product-form">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Tên sản phẩm</label>
            <input type="text" id="name" class="form-control" placeholder="Nhập tên sản phẩm" />
          </div>
          <div class="col-md-6">
            <label class="form-label">Giá (VNĐ)</label>
            <input type="number" id="price" class="form-control" placeholder="Nhập giá" />
          </div>
          <div class="col-md-6">
            <label class="form-label">Ảnh sản phẩm</label>
            <input type="file" id="image" class="form-control"/>
          </div>
          <div class="col-md-6">
            <label class="form-label">Danh mục</label>
            <select id="category_id" class="form-select">
            ${categories.map((c:Category)=>`<option value="${c.id}">${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="col-12">
            <label class="form-label">Mô tả</label>
            <textarea id="description" class="form-control" rows="3" placeholder="Nhập mô tả sản phẩm"></textarea>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-warning">
              Lưu sản phẩm
            </button>
            <a href="admin-product.html" class="btn btn-outline-secondary"
              >Hủy</a
            >
          </div>
        </div>
      </form>`
    }
}
// join('') chuyển mảng thành chuỗi