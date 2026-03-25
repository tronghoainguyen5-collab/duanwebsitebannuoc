export class ApiService {
    private storageKey = "db";

    // load dữ liệu từ file JSON lần đầu
    async init() {
        if (!localStorage.getItem(this.storageKey)) {
            const res = await fetch("./db.json"); // ⚠️ đúng path public
            const data = await res.json();
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        }
    }

    // GET ALL
    async get<T>(collection: string): Promise<T[]> {
        const data = JSON.parse(localStorage.getItem(this.storageKey) || "{}");
        return data[collection] || [];
    }

    // GET BY ID (bonus cho bạn luôn)
    async getById<T>(collection: string, id: number): Promise<T | undefined> {
        const list = await this.get<any>(collection);
        return list.find((item: any) => item.id === id);
    }

    // POST
    async post<T>(collection: string, item: any): Promise<T> {
        const data = JSON.parse(localStorage.getItem(this.storageKey) || "{}");

        const list = data[collection] || [];
        item.id = Date.now();

        list.push(item);
        data[collection] = list;

        localStorage.setItem(this.storageKey, JSON.stringify(data));

        return item;
    }

    // PUT
    async put<T>(collection: string, id: number, newData: any): Promise<T> {
        const data = JSON.parse(localStorage.getItem(this.storageKey) || "{}");

        const list = data[collection] || [];

        const index = list.findIndex((item: any) => item.id === id);
        if (index !== -1) {
            list[index] = { ...list[index], ...newData };
        }

        data[collection] = list;
        localStorage.setItem(this.storageKey, JSON.stringify(data));

        return list[index];
    }

    // DELETE
    async delete<T>(collection: string, id: number): Promise<T[]> {
        const data = JSON.parse(localStorage.getItem(this.storageKey) || "{}");

        const list = data[collection] || [];
        const newList = list.filter((item: any) => item.id !== id);

        data[collection] = newList;
        localStorage.setItem(this.storageKey, JSON.stringify(data));

        return newList;
    }
}   