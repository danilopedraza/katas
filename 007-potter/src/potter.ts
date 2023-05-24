import { throws } from "assert";

export class PotterPriceCalculator {
    multipliers: number[];
    constructor() {
        this.multipliers = [1.00, 1.00, 0.95, 0.90, 0.80, 0.75];
    }

    public getPrice(books: number[]) : number {
        return books.length * 8;
    }
}

export class Multiset {
    elements: number[];
    constructor(array?: number[]) {
        this.elements = array || [];
    }

    public get size() {
        return this.elements.length;
    }

    public has(element: number) {
        return this.repetitions(element) > 0;
    }

    public repetitions(element: number) {
        return this.elements.reduce(
            (acc, value) => acc + Number(value === element),
            0
        );
    }

    public subset(other: Multiset) {        
        return this.size <= other.size &&
               this.elements.every(element => this.repetitions(element) <= other.repetitions(element));
    }
}
