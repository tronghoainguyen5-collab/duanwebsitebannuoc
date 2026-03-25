import { User } from "../models/User.js";
import { UserService } from "../services/UserService.js";
export class LoginController {
    constructor() {
        this.userService = UserService.getInstance();
    }
    init() {
        this.attachEvents();
    }
    attachEvents() {
        var _a;
        (_a = document.querySelector('#login-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', async (e) => {
            e.preventDefault();
            let email = document.querySelector('#email').value;
            let password = document.querySelector('#password').value;
            let user = await this.userService.login(email, password);
            if (user) {
                alert('Đăng nhập thành công');
                this.userService.saveLoginState(user);
                if (user.role == "admin") {
                    location.href = "admin.html";
                }
                else {
                    location.href = 'index.html';
                }
            }
            else {
                alert('Email hoặc mật khẩu không đúng');
            }
        });
    }
}
//# sourceMappingURL=LoginController.js.map