import { User } from "../models/User.js";
import { UserService } from "../services/UserService.js";
export class RegisterController {
    constructor() {
        this.userService = UserService.getInstance();
    }
    init() {
        this.attachEvents();
    }
    attachEvents() {
        var _a;
        (_a = document.querySelector('#register-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', async (e) => {
            e.preventDefault();
            let name = document.querySelector('#name').value;
            let phone = document.querySelector('#phone').value;
            let email = document.querySelector('#email').value;
            let password = document.querySelector('#password').value;
            if (!await this.userService.checkEmailValid(email)) {
                alert('Email đã tồn tại không thể đăng ký!!');
            }
            else {
                this.userService.create(new User(undefined, email, password, phone, name, "", "user"));
                alert('Đăng ký thàng công!!!');
                location.href = 'login.html';
            }
        });
    }
}
//# sourceMappingURL=RegisterController%20copy.js.map