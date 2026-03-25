import type { Product } from "../models/Product";
import type { Topping } from "../models/Topping";

export class ProductDetailView {
  render(product: Product, toppings: Topping[]): string {
    return `
<section class="pl-product-detail">
  <div class="pl-container">

    <div class="pl-card">
      <div class="row g-0">

        <!-- IMAGE -->
        <div class="col-lg-5">
          <div class="pl-image-box">
            <img src="public/img/${product.image}" alt="${product.name}">
          </div>
        </div>

        <!-- INFO -->
        <div class="col-lg-7">
          <div class="pl-info">

            <h1 class="pl-title">${product.name}</h1>

            <div class="pl-price-box">
              <span  class="pl-price">
                ${product.price.toLocaleString("vi-VN")}đ
              </span>
            </div>

            <p class="pl-desc">${product.description}</p>

            <!-- TOPPING -->
            <div class="pl-section">
              <h5 class="pl-section-title">Chọn Topping</h5>

              <div class="pl-topping-grid">
                ${toppings.map(t => `
                  <label class="pl-topping-card">
                    <input type="checkbox"
                      data-id="${t.id}"
                      data-name="${t.name}"
                      data-price="${t.price}">
                      
                    <div class="pl-topping-content">
                      <span class="pl-topping-name">${t.name}</span>
                      <span class="pl-topping-price">
                        +${t.price.toLocaleString("vi-VN")}đ
                      </span>
                    </div>

                    <span class="pl-checkmark">✔</span>
                  </label>
                `).join("")}
              </div>
            </div>

            <!-- TOTAL -->
            <div class="pl-total-box">
              <span>Tổng cộng:</span>
              <strong id="product-price" class="pl-price">
                ${product.price.toLocaleString("vi-VN")}đ
              </strong>
            </div>

            <button type="button" id="add-to-cart" class="pl-btn-add">
              Thêm vào giỏ hàng
            </button>

          </div>
        </div>

      </div>
    </div>

  </div>
</section>
`;
  }
}
