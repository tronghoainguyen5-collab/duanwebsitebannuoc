import { Product } from "../models/Product.js";
import { ApiService } from "./ApiService.js";

export class ProductService extends ApiService {

    async getAll(): Promise<Product[]> {
        const data: any[] = await super.get("products");
        return data.map(p => new Product(
            p.id,
            p.name,
            p.price,
            p.image,
            p.description,
            p.category_id
        ));
    }

    async getById(id: number): Promise<Product | undefined> {
        const data: any = await super.getById("products", id);
        if (!data) return undefined;

        return new Product(
            data.id,
            data.name,
            data.price,
            data.image,
            data.description,
            data.category_id
        );
    }

    async create(p: Product): Promise<Product> {
        const data: any = await super.post("products", p);
        return new Product(
            data.id,
            data.name,
            data.price,
            data.image,
            data.description,
            data.category_id
        );
    }

    async edit(p: Product): Promise<Product | undefined> {
        if (!p.id) throw new Error("Product ID không hợp lệ");

        const data: any = await super.put("products", Number(p.id), p);
        if (!data) return undefined;

        return new Product(
            data.id,
            data.name,
            data.price,
            data.image,
            data.description,
            data.category_id
        );
    }

    async remove(id: number): Promise<Product[]> {
        const data: any[] = await super.delete("products", id);

        return data.map(p => new Product(
            p.id,
            p.name,
            p.price,
            p.image,
            p.description,
            p.category_id
        ));
    }
}