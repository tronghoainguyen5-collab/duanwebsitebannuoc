import type { CartItem } from "../models/CartItem.js";
import type { Topping } from "../models/Topping.js";

export class CartView {
  render(items: CartItem[], total: number): string {
  if (items.length === 0) {
    return `
    <div class="pl-cart-empty">
      <h3>Giỏ hàng trống</h3>
      <p>Hãy chọn món bạn yêu thích nhé ☕</p>
      <a href="index.html" class="pl-btn-primary">
        Quay về menu
      </a>
    </div>`;
  }

  return `
  <section class="pl-cart-page">
    <div class="pl-cart-container">

      <h2 class="pl-cart-title">Giỏ hàng của bạn</h2>

      <div class="pl-cart-layout">

        <!-- DANH SÁCH SẢN PHẨM -->
        <div class="pl-cart-items">

          ${items.map(item => `
          <div class="pl-cart-item">

            <div class="pl-cart-img">
              <img src="public/img/${item.product.image}" />
            </div>

            <div class="pl-cart-info">
              <h5>${item.product.name}</h5>

              <div class="pl-cart-toppings">
                ${item.toppings.map(t => `
                  <span class="pl-badge">
                    ${t.name} +${t.price.toLocaleString()}đ
                  </span>
                `).join("")}
              </div>

              <p class="pl-base-price">
                Giá gốc: ${item.product.price.toLocaleString()}đ
              </p>
            </div>

            <div class="pl-cart-action">

              <div class="pl-qty-control">
                <input
                  type="number"
                  min="1"
                  value="${item.quantity}"
                  data-id="${item.product.id}"
                  class="pl-quantity quantity"
                />
              </div>

              <p class="pl-item-total">
                ${item.getTotal().toLocaleString()}đ
              </p>

              <button
                class="pl-remove-btn remove-item"
                data-id="${item.product.id}">
                Xóa
              </button>

            </div>

          </div>
          `).join("")}

        </div>

        <!-- SIDEBAR THANH TOÁN -->
        <div class="pl-cart-summary">

          <div class="pl-summary-card">
            <h4>Tổng cộng</h4>
            <div class="pl-summary-total">
              ${total.toLocaleString()}đ
            </div>

            <button id="clear-cart" class="pl-btn-outline">
              Xóa toàn bộ giỏ hàng
            </button>
          </div>

         

        </div>
 
      </div>
 <div class="pl-order-card">
            <h4>Thông tin giao hàng</h4>

            <form id="order-form">
              <input type="text" id="fullname" placeholder="Họ và tên" required />
              <input type="tel" id="phone" placeholder="Số điện thoại" required />
              <textarea id="address" placeholder="Địa chỉ giao hàng"></textarea>

              <button type="submit" class="pl-btn-primary btn">
                Xác nhận đặt hàng
              </button>
            </form>
          </div>
    </div>
  </section>
  `;
}
}
