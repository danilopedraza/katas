export class PotterPriceCalculator {
    multipliers: number[];
    constructor() {
        this.multipliers = [1.00, 1.00, 0.95, 0.90, 0.80, 0.75];
    }

    public getPrice(books: number[]) : number {
        return books.length * 8;
    }
}

abstract class Distinguishable {
    constructor() {}

    abstract equals(other: Distinguishable): boolean;
}

export class PotterBook extends Distinguishable {
    id: number;
    constructor(id: number) {
        super();
        this.id = id;
    }

    equals(other: PotterBook): boolean {
        return this.id === other.id;
    }
}

export class Multiset<T extends Distinguishable> {
    elements: T[];
    constructor(array?: T[]) {
        this.elements = array || [];
    }

    public get size() {
        return this.elements.length;
    }
    
    public repetitions(element: T) {
        return this.elements.reduce(
            (acc, value) => acc + Number(value.equals(element)),
            0
        );
    }
    
    public has(element: T) {
        return this.repetitions(element) > 0;
    }

    public subset(other: Multiset<T>) {        
        return this.size <= other.size &&
               this.elements.every(element => this.repetitions(element) <= other.repetitions(element));
    }

    public equals(other: Multiset<T>) {
        return this.subset(other) && other.subset(this);
    }

    public union(other: Multiset<T>) {
        return new Multiset(this.elements.concat(other.elements));
    }

    public static allSetPartitions<T extends Distinguishable>(multiset: Multiset<T>) {
        return new Multiset([multiset]);
    }
}

export class PotterBookOrder extends Multiset<PotterBook> {
    constructor(books: PotterBook[]) {
        super(books);
    }

    public suborder(other: PotterBookOrder) {
        return this.subset(other);
    }
}
