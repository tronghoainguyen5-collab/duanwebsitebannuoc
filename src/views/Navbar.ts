import { User } from "../models/User.js";

export class Navbar {
  render(user: User | false): string {
    return `
    <ul class="navbar-nav mx-auto navbar-menu">

      <li class="nav-item">
        <a class="nav-link" href="index.html">Trang chủ</a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="#">Menu</a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="#">Khuyến mãi</a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="#">Hội viên</a>
      </li>

      ${
        !user
          ? `
          <li class="nav-item nav-auth">
            <a class="nav-link" href="login.html">Đăng nhập</a>
          </li>
          <li class="nav-item nav-auth">
            <a class="nav-link" href="register.html">Đăng ký</a>
          </li>
        `
          : `
          <li class="nav-item nav-user">
            <a class="nav-link" href="profile.html">
              Xin chào, <strong>${user.name}</strong>
            </a>
          </li>
          <li class="nav-item nav-auth">
            <a id="logout-link" class="nav-link logout" href="#">
              Đăng xuất
            </a>
          </li>
        `
      }

    </ul>
    `;
  }
}
