import { User } from "../models/User.js";
import { ApiService } from "./ApiService.js";

export class UserService extends ApiService {
    private static instance: UserService;

    static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    async create(user: User): Promise<User> {
        const data: any = await super.post("users", user);

        return new User(
            data.id,
            data.email,
            data.password,
            data.phone,
            data.name,
            data.address || "",
            data.role
        );
    }

    async checkEmailValid(email: string): Promise<boolean> {
        const users: any[] = await super.get("users");
        return !users.find(u => u.email === email);
    }

    async login(email: string, password: string): Promise<User | false> {
        const users: any[] = await super.get("users");

        const found = users.find(
            u => u.email.trim() === email.trim() &&
                 u.password.trim() === password.trim()
        );

        if (!found) return false;

        return new User(
            found.id,
            found.email,
            "",
            found.phone,
            found.name,
            found.address || "",
            found.role
        );
    }

    saveLoginState(user: User): void {
        localStorage.setItem("user", JSON.stringify(user));
    }

    getLoginState(): User | false {
        const userString = localStorage.getItem("user");

        if (!userString) return false;

        const user: any = JSON.parse(userString);

        return new User(
            user.id,
            user.email,
            "",
            user.phone,
            user.name,
            user.address || "",
            user.role
        );
    }

    clearLoginState(): void {
        localStorage.removeItem("user");
    }

    // ⚠️ KHÔNG override getById nữa → đổi tên
    async findById(id: number): Promise<User | undefined> {
        const data: any = await super.getById("users", id);
        if (!data) return undefined;

        return new User(
            data.id,
            data.email,
            "",
            data.phone,
            data.name,
            data.address || "",
            data.role
        );
    }

    async updateUser(user: User): Promise<User | undefined> {
        if (!user.id) throw new Error("User ID không hợp lệ");

        const data: any = await super.put("users", Number(user.id), user);
        if (!data) return undefined;

        return new User(
            data.id,
            data.email,
            "",
            data.phone,
            data.name,
            data.address || "",
            data.role
        );
    }
}