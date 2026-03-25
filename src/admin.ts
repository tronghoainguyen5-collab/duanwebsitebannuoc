import { AdminController } from "./controllers/AdminController.js";
import { AdminOrderController } from "./controllers/AdminOrderController.js";
import { AdminOrderDetailController } from "./controllers/AdminOrderDetailController.js";
import { AdminProductController } from "./controllers/AdminProductController.js";
import { AdminProductFormController } from "./controllers/AdminProductFormController.js";
import { AdminToppingController } from "./controllers/AdminToppingController.js";
import { AdminToppingFormController } from "./controllers/AdminToppingFormController.js";
import { User } from "./models/User.js";
import { UserService } from "./services/UserService.js";

let controller;

let user:User | false;
user = new UserService().getLoginState();
const path = location.pathname;
 if (path.includes('admin.html')) {
  google.charts.load("current", { packages: ["corechart"] });
        controller = new AdminController();
}
else if (path.includes('admin-product-form.html')) {
  controller = new AdminProductFormController();
}
else if (path.includes('admin-product.html')) {
  controller = new AdminProductController();
}
else if (path.includes('admin-topping.html')) {
  controller = new AdminToppingController();
}
else if (path.includes('admin-topping-form.html')) {
  controller = new AdminToppingFormController();
}
else if (path.includes('admin-order-detail.html')) {
  controller = new AdminOrderDetailController();
}
else if (path.includes('admin-order.html')) {
  controller = new AdminOrderController();
}


controller?.init();
