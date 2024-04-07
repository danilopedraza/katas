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
        return this.size <= other.size
            && this.elements.every(
                element => this.repetitions(element) <= other.repetitions(element)
            );
    }

    public equals(other: Multiset<T>) {
        return this.subset(other) && other.subset(this);
    }

    public union(other: Multiset<T>) {
        return new Multiset(this.elements.concat(other.elements));
    }

    public withoutOne(otherElement: T) {
        const index = this.elements.findIndex((element) => element.equals(otherElement));

        if (index === -1) {
            return new Multiset([...this.elements]);
        } else {
            return new Multiset(
                this.elements.slice(0, index)
                .concat(this.elements.slice(index + 1, this.elements.length))
            );
        }
    }

    public minus(other: Multiset<T>) {
        let res = new Multiset(this.elements);

        for (const element of other.elements) {
            res = res.withoutOne(element);
        }

        return res;
    }
}

export class PotterBookOrder extends Multiset<PotterBook> {
    constructor(books: PotterBook[]) {
        super(books);
    }

    private allSpecialOrders() {
        return [
            [new PotterBook(0),],
            [new PotterBook(1),],
            [new PotterBook(2),],
            [new PotterBook(3),],
            [new PotterBook(4),],
            [new PotterBook(0), new PotterBook(1),],
            [new PotterBook(0), new PotterBook(2),],
            [new PotterBook(0), new PotterBook(3),],
            [new PotterBook(0), new PotterBook(4),],
            [new PotterBook(1), new PotterBook(2),],
            [new PotterBook(1), new PotterBook(3),],
            [new PotterBook(1), new PotterBook(4),],
            [new PotterBook(2), new PotterBook(3),],
            [new PotterBook(2), new PotterBook(4),],
            [new PotterBook(3), new PotterBook(4),],
            [new PotterBook(0), new PotterBook(1), new PotterBook(2),],
            [new PotterBook(0), new PotterBook(1), new PotterBook(3),],
            [new PotterBook(0), new PotterBook(1), new PotterBook(4),],
            [new PotterBook(0), new PotterBook(2), new PotterBook(3),],
            [new PotterBook(0), new PotterBook(2), new PotterBook(4),],
            [new PotterBook(0), new PotterBook(3), new PotterBook(4),],
            [new PotterBook(1), new PotterBook(2), new PotterBook(3),],
            [new PotterBook(1), new PotterBook(2), new PotterBook(4),],
            [new PotterBook(1), new PotterBook(3), new PotterBook(4),],
            [new PotterBook(2), new PotterBook(3), new PotterBook(4),],
            [new PotterBook(0), new PotterBook(1), new PotterBook(2), new PotterBook(3),],
            [new PotterBook(0), new PotterBook(1), new PotterBook(2), new PotterBook(4),],
            [new PotterBook(0), new PotterBook(1), new PotterBook(3), new PotterBook(4),],
            [new PotterBook(0), new PotterBook(2), new PotterBook(3), new PotterBook(4),],
            [new PotterBook(1), new PotterBook(2), new PotterBook(3), new PotterBook(4),],
            [new PotterBook(0), new PotterBook(1), new PotterBook(2), new PotterBook(3), new PotterBook(4),],
        ].map((l) => new PotterBookOrder(l));
    }

    public orderMinus(other: PotterBookOrder) {
        return new PotterBookOrder([...this.minus(other).elements]);
    }

    public suborder(other: PotterBookOrder) {
        return this.subset(other);
    }

    public specialOrders() {
        return this.allSpecialOrders().filter((so) => so.suborder(this));
    }

    public isSpecial() {
        return this.allSpecialOrders().some((so) => so.equals(this));
    }

    public specialDiscount(books: number) {
        switch (books) {
            case 1: return 1.0;
            case 2: return 0.95;
            case 3: return 0.9;
            case 4: return 0.8;
            case 5: return 0.75;
            default: return 1.0;
        }
    }

    public price() {
        if (this.elements.length === 0) {
            return 0;
        }

        if (this.isSpecial()) {
            const books = this.elements.length;
            return 8 * books * this.specialDiscount(books);
        }

        let prices: number[] = this.specialOrders().map((so) => this.orderMinus(so).price() + so.price());

        return Math.min(...prices);
    }
}
