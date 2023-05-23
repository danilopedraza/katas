export class PotterPriceCalculator {
    multipliers: number[];
    constructor() {
        this.multipliers = [1.00, 1.00, 0.95, 0.90, 0.80, 0.75];
    }

    public getPrice(books: number[]) : number {
        return books.length * 8;
    }
}
