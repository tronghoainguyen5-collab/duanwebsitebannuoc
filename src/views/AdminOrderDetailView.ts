import { CartItem } from "../models/CartItem.js";
import type { Order } from "../models/Order.js";
import type { Topping } from "../models/Topping.js";

export class AdminOrderDetailView{
    renderOrder(o: Order) {
        return `
          <div class="row">
            <div class="col-md-6">
              <!-- Thông tin khách hàng -->
              <div class="card mb-4">
                <div class="card-body">
                  <h5>Thông tin khách hàng</h5>
                  <p><strong>Họ tên:</strong> ${o.user.name}</p>
                  <p><strong>Số điện thoại:</strong> ${o.user.phone}</p>
                  <p><strong>Email:</strong> ${o.user.email}</p>
                  <p>
                    <strong>Địa chỉ:</strong> ${o.user.address}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <!-- Thông tin đơn hàng -->
              <div class="card mb-4">
                <div class="card-body">
                  <h5>Thông tin đơn hàng</h5>
                  <p><strong>Mã đơn:</strong> ${o.id}</p>
                  <p><strong>Ngày tạo:</strong> ${new Date(o.createDate).toLocaleDateString('vi-VN')}</p>
                  <p><strong>Tổng tiền:</strong> ${o.total.toLocaleString('vi-VN')}đ</p>
                  <p>
                    <strong>Trạng thái:</strong>
                    <span class="badge bg-${o.status=='shipping'?'primary':(o.status=='cancel')?'danger':(o.status=='success')?
                    'success':'secondary'}">${o.status}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Danh sách sản phẩm -->
          <div class="card mb-4">
            <div class="card-body">
              <h5>Sản phẩm trong đơn hàng</h5>
              <table class="table table-bordered align-middle text-end">
                <thead>
                  <tr>
                    <th class="text-start">Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Giá (VNĐ)</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                ${o.items.map((item:CartItem)=> `
                  <tr>
                    <td class="text-start">
                      <img
                        src="public/img/${item.product.image}"
                        alt="${item.product.name}"
                        width="80"
                      />
                      ${item.product.name}
                      <strong>Topping được chọn:</string>
                      <ul>
                      ${item.toppings.map((t:Topping)=>`<li>${t.name}  (+${t.price.toLocaleString('vi-VN')} đ)</li>`).join('')}
                      </ul>
                    </td>
                    <td>${item.quantity}</td>
                    <td>${item.product.price.toLocaleString('vi-VN')}đ</td>
                    <td>${item.getTotal().toLocaleString('vi-VN')}đ</td>
                  </tr>`)}

                </tbody>
              </table>
            </div>
          </div>

          <!-- Nút hành động -->
          <div class="d-flex gap-2">
           ${(o.status == 'pending'||o.status == 'shipping')?`<button id="btn-confirm" class="btn btn-success">
          ${(o.status=='pending')?'Xác nhận đã đóng hàng':'Xác nhận đã giao hàng'}</button>`:''}
          ${o.status!='success'&&o.status!='cancel'?`<button id="btn-cancel" class="btn btn-danger">Hủy đơn hàng</button>`:``}
            <a href="admin-order.html" class="btn btn-secondary">Quay lại</a>
          </div>`;
    }
}
// join('') chuyển mảng thành chuỗi