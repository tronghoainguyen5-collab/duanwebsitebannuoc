export class Topping{
    public id: string|undefined;
    public name: string;
    public price: number;

    constructor(id:string|undefined, name:string, price:number){
        this.id = id;
        this.name = name;
        this.price = price;
    }
}