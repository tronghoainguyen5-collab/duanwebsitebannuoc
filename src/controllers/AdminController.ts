/// <reference types="google.visualization" />

import type { Order } from "../models/Order.js";
import { OrderService } from "../services/OrderService.js";
import { StatisticService } from "../services/StatisticService.js";
import { AdminView } from "../views/AdminView.js";


export class AdminController{
    private view = new AdminView();
    private orderService = new OrderService();
    private statisticService = new StatisticService();

    public async init(){
    await this.render();
     this.attachEvent();
    }

   async render(){
        let orders:Order[] = await this.orderService.getLimit(5); // Xây dựng thêm CategoryService kế thừa từ ApiService để tạo và gọi hàm getAll()
        let totalProduct:number = await this.statisticService.getTotalProduct();
        let totalUser:number = await this.statisticService.getTotalUser();
        let totalOrder:number = await this.statisticService.getTotalOrder();
        let totalMoney:number = await this.statisticService.getTotalMoney();

        document.querySelector('#main')!.innerHTML = this.view.render(orders, totalProduct, totalUser, totalOrder, totalMoney);
        let data:[string, number][] = await this.statisticService.getRevenueByDate();
        console.log(data);

        this.drawChart(data);
    }

    attachEvent():void{
    
    }

    drawChart(statData:[string, number][]):void{
        const rows: any[][] = [
            ["Ngày", "Doanh thu (VNĐ)"],
        ];
        for (const date in statData) {
            const formattedDate = new Date(date).toLocaleDateString('vi-VN', {day: '2-digit', month: '2-digit'});
            rows.push([formattedDate, statData[date]]);
        }

        var data = google.visualization.arrayToDataTable(rows);

        var options: google.visualization.ColumnChartOptions = {
            title: "Doanh thu từng ngày",
            hAxis: { title: "Ngày" },
            vAxis: { title: "Doanh thu (VNĐ)" },
            legend: { position: "none" },
            colors: ["#FF8C00"],
        };

        var chart = new google.visualization.ColumnChart(
            document.getElementById("revenue_chart") as Element,
        );
        chart.draw(data, options);
        }

}
// !. kiểm tra có tồn tại phần tử đó hay không trước khi gán giá trị cho nó