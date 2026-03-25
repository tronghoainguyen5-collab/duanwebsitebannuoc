var _a;
import { CartController } from "./controllers/CartController.js";
import { HomeController } from "./controllers/HomeController.js";
import { LoginController } from "./controllers/LoginController.js";
import { ProductDetailController } from "./controllers/ProductDetailController.js";
import { RegisterController } from "./controllers/RegisterController.js";
import { User } from "./models/User.js";
import { UserService } from "./services/UserService.js";
import { Navbar } from "./views/Navbar.js";
let controller;
// let page:string = location.pathname;
const path = location.pathname;
let user = new UserService().getLoginState();
// NAVBAR (an toàn)
const navbarEl = document.querySelector('#navbarNav');
if (navbarEl) {
    navbarEl.innerHTML = new Navbar().render(user);
    (_a = document.querySelector('#logout-link')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
        e.preventDefault();
        new UserService().clearLoginState();
        location.href = 'index.html';
    });
}
if (path.includes('index.html') || path === '/') {
    controller = new HomeController();
}
else if (path.includes('product.html')) {
    controller = new ProductDetailController();
}
else if (path.includes('cart.html')) {
    controller = new CartController();
}
else if (path.includes('login.html')) {
    controller = new LoginController();
}
else if (path.includes('register.html')) {
    controller = new RegisterController();
}
else {
    controller = new HomeController();
}
controller === null || controller === void 0 ? void 0 : controller.init();
//# sourceMappingURL=app.js.map