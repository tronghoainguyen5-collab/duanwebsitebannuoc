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
let page = location.pathname;
let user;
user = new UserService().getLoginState();
document.querySelector('#navbarNav').innerHTML = new Navbar().render(user);
(_a = document.querySelector('#logout-link')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
    e.preventDefault();
    new UserService().clearLoginState();
    location.href = 'index.html';
});
switch (page) {
    case '/':
    case '/index.html':
        controller = new HomeController();
        break;
    case '/product.html':
        controller = new ProductDetailController();
        break;
    case '/cart.html':
        controller = new CartController();
        // load CartController():
        break;
    case '/register.html':
        controller = new RegisterController();
        break;
    case '/login.html':
        controller = new LoginController();
        break;
    default:
        controller = new HomeController();
        break;
}
if (controller)
    controller.init();
//# sourceMappingURL=app%20copy.js.map