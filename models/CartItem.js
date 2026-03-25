export class CartItem {
    constructor(product, toppings, quantity = 1) {
        this.product = product;
        this.toppings = toppings;
        this.quantity = quantity;
    }
    getTotal() {
        const toppingPrice = this.toppings.reduce((sum, t) => sum + t.price, 0);
        return (this.product.price + toppingPrice) * this.quantity;
    }
    getToppingNames() {
        return this.toppings.length == 0 ? 'Không có topping' : this.toppings.map((t) => t.name).join(', ');
    }
    static isTheSame(item1, item2) {
        // TH1: 2 sản phẩm khác nhau (khác id)
        if (item1.product.id != item2.product.id)
            return false;
        // TH2: 2 sản phẩm có số lượng topping khác nhau
        if (item1.toppings.length != item2.toppings.length)
            return false;
        // TH3: 2 sản phẩm giống nhau về số lượng topping  -> Kiểm tra từng loại topping có giống nhau không
        item1.toppings.forEach((t1) => {
            // Trà đào (trân châu đen + trân châu trắng) != Trà đào (trân châu đen + thạch lá dứa) >> return false
            if (!item2.toppings.some((t2) => t2.id == t1.id))
                return false;
        });
        // Trà đào (trân châu đen + trân châu trắng) == Trà đào (trân châu trắng + trân châu đen) >> return true
        return true;
    }
}
//Trà đào cam xả + không topping
// Trà đào cam xả + Trân châu trắng + Trân châu đen x2
//# sourceMappingURL=CartItem.js.map