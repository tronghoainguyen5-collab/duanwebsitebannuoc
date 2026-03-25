import { User } from "../models/User.js";

export class ProfileView {

    render(user: User): string {
        return `
        <div class="container my-5">
          <h2 class="mb-4">Thông tin cá nhân</h2>
          <div class="row">

            <div class="col-md-3">
              <div class="card shadow mb-4">
                <div class="card-body">
                  <h4 class="mb-3">Cập nhật thông tin</h4>

                  <form id="update-profile-form">

                    <div class="mb-3">
                      <label class="form-label">Họ tên</label>
                      <input type="text" id="name" 
                        class="form-control" 
                        value="${user.name ?? ""}" />
                    </div>

                    <div class="mb-3">
                      <label class="form-label">Số điện thoại</label>
                      <input type="tel" id="phone" 
                        class="form-control" 
                        value="${user.phone ?? ""}" />
                    </div>

                    <div class="mb-3">
                      <label class="form-label">Email</label>
                      <input type="email" id="email" 
                        class="form-control" 
                        value="${user.email ?? ""}" />
                    </div>

                    <div class="mb-3">
                      <label class="form-label">Mật khẩu</label>
                      <input type="password" id="password" 
                        class="form-control"
                        placeholder="(Để trống nếu không đổi)" />
                    </div>

                    <div class="mb-3">
                      <label class="form-label">Địa chỉ</label>
                      <textarea id="address" 
                        class="form-control" rows="3">
${user.address ?? ""}
                      </textarea>
                    </div>

                    <button type="submit" class="btn btn-warning">
                      Lưu thay đổi
                    </button>

                  </form>
                </div>
              </div>
            </div>

            <div class="col-md-9">
              <div class="card shadow">
                <div class="card-body">
                  <h4 class="mb-3">Đơn hàng đã đặt</h4>
                  <div id="order-list"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
        `;
    }
}