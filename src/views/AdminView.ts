import { Order } from "../models/Order.js";

export class AdminView{
    render(orders:Order[], totalProduct:number, totalUser:number, totalOrder:number, totalMoney:number):string {
        return `<h2 class="mb-4">Tổng quan</h2>
          <div class="row g-4">
            <div class="col-md-3">
              <div class="card dashboard-card">
                <div class="card-body">
                  <h5>Sản phẩm</h5>
                  <p class="display-6">${totalProduct}</p>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card dashboard-card">
                <div class="card-body">
                  <h5>Đơn hàng</h5>
                  <p class="display-6">${totalOrder}</p>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card dashboard-card">
                <div class="card-body">
                  <h5>Người dùng</h5>
                  <p class="display-6">${totalUser}</p>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card dashboard-card">
                <div class="card-body">
                  <h5>Doanh thu</h5>
                  <p class="display-6">${totalMoney.toLocaleString('vi-VN')}đ</p>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-5">
            <div class="col-md-6">
              <!-- Biểu đồ doanh thu -->
              <h4>Biểu đồ doanh thu từng ngày</h4>
              <div id="revenue_chart" style="width: 100%; height: 400px"></div>
            </div>
            <div class="col-md-6">
              <!-- Bảng đơn hàng gần đây -->
              <h4>Đơn hàng gần đây</h4>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Mã đơn</th>
                    <th>Khách hàng</th>
                    <th>Ngày đặt</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                ${orders.map((o:Order)=>`<tr>
                    <td>
                    <a href="admin-order-detail.html?id=${o.id}">#${o.id}</a>
                    </td>
                    <td>${o.user.name}</td>
                    <td>${new Date(o.createDate).toLocaleString('vi-VN')}</td>
                    <td><span class="badge bg-${o.status=='shipping'?'primary':(o.status=='cancel')?'danger':(o.status=='success')?
                    'success':'secondary'}">${o.status}</span></td>
                  </tr>` ).join(``)}
                  
                </tbody>
              </table>
            </div>
          </div>`;
    }
}
// join('') chuyển mảng thành chuỗi