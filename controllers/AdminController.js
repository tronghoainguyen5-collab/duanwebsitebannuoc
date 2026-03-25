/// <reference types="google.visualization" />
import { OrderService } from "../services/OrderService.js";
import { StatisticService } from "../services/StatisticService.js";
import { AdminView } from "../views/AdminView.js";
export class AdminController {
    constructor() {
        this.view = new AdminView();
        this.orderService = new OrderService();
        this.statisticService = new StatisticService();
    }
    async init() {
        await this.render();
        this.attachEvent();
    }
    async render() {
        let orders = await this.orderService.getLimit(5); // Xây dựng thêm CategoryService kế thừa từ ApiService để tạo và gọi hàm getAll()
        let totalProduct = await this.statisticService.getTotalProduct();
        let totalUser = await this.statisticService.getTotalUser();
        let totalOrder = await this.statisticService.getTotalOrder();
        let totalMoney = await this.statisticService.getTotalMoney();
        document.querySelector('#main').innerHTML = this.view.render(orders, totalProduct, totalUser, totalOrder, totalMoney);
        let data = await this.statisticService.getRevenueByDate();
        console.log(data);
        this.drawChart(data);
    }
    attachEvent() {
    }
    drawChart(statData) {
        const rows = [
            ["Ngày", "Doanh thu (VNĐ)"],
        ];
        for (const date in statData) {
            const formattedDate = new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
            rows.push([formattedDate, statData[date]]);
        }
        var data = google.visualization.arrayToDataTable(rows);
        var options = {
            title: "Doanh thu từng ngày",
            hAxis: { title: "Ngày" },
            vAxis: { title: "Doanh thu (VNĐ)" },
            legend: { position: "none" },
            colors: ["#FF8C00"],
        };
        var chart = new google.visualization.ColumnChart(document.getElementById("revenue_chart"));
        chart.draw(data, options);
    }
}
// !. kiểm tra có tồn tại phần tử đó hay không trước khi gán giá trị cho nó
//# sourceMappingURL=AdminController.js.map