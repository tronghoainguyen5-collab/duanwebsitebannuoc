import { User } from "../models/User.js";
import { UserService } from "../services/UserService.js";
export class ProfileController {
    constructor() {
        this.userService = new UserService();
    }
    async init() {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("Bạn chưa đăng nhập");
            return;
        }
        const user = await this.userService.getById(userId);
        this.fillForm(user);
        this.attachEvents(user);
    }
    fillForm(user) {
        var _a, _b, _c, _d;
        document.querySelector("#name").value = (_a = user.name) !== null && _a !== void 0 ? _a : "";
        document.querySelector("#phone").value = (_b = user.phone) !== null && _b !== void 0 ? _b : "";
        document.querySelector("#email").value = (_c = user.email) !== null && _c !== void 0 ? _c : "";
        document.querySelector("#address").value = (_d = user.address) !== null && _d !== void 0 ? _d : "";
    }
    attachEvents(user) {
        var _a;
        (_a = document
            .querySelector("#update-profile-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", async (e) => {
            e.preventDefault();
            user.name = document.querySelector("#name").value;
            user.phone = document.querySelector("#phone").value;
            user.email = document.querySelector("#email").value;
            user.address = document.querySelector("#address").value;
            const newPassword = document.querySelector("#password").value;
            if (newPassword.trim() !== "") {
                user.password = newPassword;
            }
            await this.userService.updateUser(user);
            alert("Cập nhật thành công!");
        });
    }
}
//# sourceMappingURL=ProfileController.js.map