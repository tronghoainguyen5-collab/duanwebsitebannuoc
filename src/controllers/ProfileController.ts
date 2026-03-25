import { User } from "../models/User.js";
import { UserService } from "../services/UserService.js";

export class ProfileController {

    private userService = new UserService();

    async init(): Promise<void> {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            alert("Bạn chưa đăng nhập");
            return;
        }

        const user = await this.userService.getById(userId);

        this.fillForm(user);
        this.attachEvents(user);
    }

   private fillForm(user: User): void {
    (document.querySelector("#name") as HTMLInputElement).value = user.name ?? "";
    (document.querySelector("#phone") as HTMLInputElement).value = user.phone ?? "";
    (document.querySelector("#email") as HTMLInputElement).value = user.email ?? "";
    (document.querySelector("#address") as HTMLTextAreaElement).value = user.address ?? "";
}

    private attachEvents(user: User): void {

        document
            .querySelector("#update-profile-form")
            ?.addEventListener("submit", async (e: Event) => {

                e.preventDefault();

                user.name = (document.querySelector("#name") as HTMLInputElement).value;
                user.phone = (document.querySelector("#phone") as HTMLInputElement).value;
                user.email = (document.querySelector("#email") as HTMLInputElement).value;
                user.address = (document.querySelector("#address") as HTMLTextAreaElement).value;

                const newPassword = (document.querySelector("#password") as HTMLInputElement).value;

                if (newPassword.trim() !== "") {
                    user.password = newPassword;
                }

                await this.userService.updateUser(user);

                alert("Cập nhật thành công!");
            });
    }
}