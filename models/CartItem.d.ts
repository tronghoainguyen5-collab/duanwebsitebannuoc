import type { Product } from "./Product.js";
import type { Topping } from "./Topping.js";
export declare class CartItem {
    product: Product;
    toppings: Topping[];
    quantity: number;
    constructor(product: Product, toppings: Topping[], quantity?: number);
    getTotal(): number;
    getToppingNames(): string;
    static isTheSame(item1: CartItem, item2: CartItem): boolean;
}
//# sourceMappingURL=CartItem.d.ts.map