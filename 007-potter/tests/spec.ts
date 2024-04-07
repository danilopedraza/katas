import { Multiset, PotterBook, PotterBookOrder } from '../src/potter';

describe('The Potter book price calculator', () => {
    it('should return 0 when there are no copies', () => {
        expect(new PotterBookOrder([]).price()).toEqual(0);
    });

    it("should return 8 when there is a single copy", () => {
        expect(new PotterBookOrder([new PotterBook(0)]).price()).toEqual(8);
    });

    it("should make no discounts when there are only copies of a single book", () => {
        expect(new PotterBookOrder([new PotterBook(0), new PotterBook(0), new PotterBook(0),]).price()).toEqual(24);
    });

    it("should make a discount for two groups of four books", () => {
        const books = new PotterBookOrder([
            new PotterBook(0), new PotterBook(0),
            new PotterBook(1), new PotterBook(1),
            new PotterBook(2), new PotterBook(2),
            new PotterBook(3), new PotterBook(4),
        ]);

        expect(books.price()).toEqual(2 * (8 * 4 * 0.8));
    });
});

describe('A multiset', () => {
    describe('is an unordered collection of distinguishable objects,', () => {
        describe('where these objects can be repeated.', () => {
            describe('A multiset generated from an array', () => {
                describe('should preserve the number of elements in the array', () => {
                    it('with an empty array', () => {
                        expect(new Multiset([]).size).toEqual(0);
                    });

                    it('with a single element array', () => {
                        expect(new Multiset([new PotterBook(0)]).size).toEqual(1);
                    });

                    it('with an array of two equal elements', () => {
                        expect(new Multiset([new PotterBook(0), new PotterBook(0)]).size).toEqual(2);
                    });
                });
            });

            describe('A multiset is a subset of another multiset', () => {
                describe('if all of its elements are in the other', () => {
                    describe('at least the same amount of times.', () => {
                        describe('An empty multiset is contained in every multiset,', () => {
                            it('like another empty multiset', () => {
                                expect(new Multiset().subset(new Multiset())).toEqual(true);
                            });

                            it('like a single element multiset', () => {
                                expect(new Multiset().subset(new Multiset([new PotterBook(0)]))).toEqual(true);
                            });
                        });

                        describe('A single element multiset', () => {
                            it('should not be contained in an empty multiset', () => {
                                expect(new Multiset([new PotterBook(0)]).subset(new Multiset())).toEqual(false);
                            });
                        });

                        describe('A two-element multiset', () => {
                            it('should not be a subset of a single element multiset', () => {
                                expect(new Multiset([new PotterBook(0),new PotterBook(0)]).subset(new Multiset([new PotterBook(0)]))).toEqual(false);
                            });

                            it('should not be a subset of a multiset with less repetitions in one element', () => {
                                expect(new Multiset([new PotterBook(0), new PotterBook(0)]).subset(new Multiset([new PotterBook(0), new PotterBook(1)]))).toEqual(false);
                            });
                        });
                    });
                });
            });

            describe('A multiset is equal to another multiset', () => {
                describe('if the one is a subset of the other and viceversa.', () => {
                    it('The order of the generating array doesn\'t matter', () => {
                        expect(new Multiset([new PotterBook(0), new PotterBook(1)]).equals(new Multiset([new PotterBook(1), new PotterBook(0)]))).toEqual(true);
                    });
                });
            });

            describe('The union of two multisets', () => {
                describe('is a multiset with the elements of both multisets.', () => {
                    describe('Always, the length of the union', () => {
                        describe('is the sum of the lengths', () => {
                            it('for empty multisets', () => {
                                expect(new Multiset().union(new Multiset()).size).toEqual(0);
                            });

                            it('for single element multisets', () => {
                                expect(new Multiset([new PotterBook(0)]).union(new Multiset([new PotterBook(0)])).size).toEqual(2);
                            });
                        });
                    });
                });
            });

            describe('The difference of two multisets', () => {
                describe('is the first multiset without the elements of the second.', () => {
                    describe('a difference with the empty set always results in the first set.', () => {
                        it('when the first set is empty', () => {
                            expect(new Multiset().minus(new Multiset()).equals(new Multiset())).toBe(true);
                        });

                        it('when the first set is a singleton', () => {
                            const ms = new Multiset([new PotterBook(0)]);
                            expect(ms.minus(new Multiset()).equals(ms)).toBe(true);
                        });
                    });

                    describe('the difference with a nonempty superset works as initially defined', () => {
                        it('when the multisets are equal', () => {
                            const ms = new Multiset([new PotterBook(0)]);
                            expect(ms.minus(ms)).toEqual(new Multiset());
                        });

                        it('when the first is a superset of the second', () => {
                            expect(
                                new Multiset([new PotterBook(0), new PotterBook(0), new PotterBook(1),])
                                .minus(new Multiset([new PotterBook(0), new PotterBook(1),]))
                            ).toEqual(new Multiset([new PotterBook(0),]));
                        });
                        
                        it('when the multisets are disjoint', () => {
                            const ms = new Multiset([new PotterBook(0),]);
                            expect(ms.minus(new Multiset([new PotterBook(1),]))).toEqual(ms);
                        });
                    });
                });
            });
        });
    });
});


describe('A Potter book order', () => {
    describe('is a multiset of Potter books.', () => {
        describe('a special order of Potter books', () => {
            describe('is a suborder of a Potter book order', () => {
                describe('where every element is different.', () => {
                    it('an order with all the books has every possible SS', () => {
                        let specialOrders = [
                            [new PotterBook(0),],
                            [new PotterBook(1),],
                            [new PotterBook(2),],
                            [new PotterBook(3),],
                            [new PotterBook(0), new PotterBook(1),],
                            [new PotterBook(0), new PotterBook(2),],
                            [new PotterBook(0), new PotterBook(3),],
                            [new PotterBook(1), new PotterBook(2),],
                            [new PotterBook(1), new PotterBook(3),],
                            [new PotterBook(2), new PotterBook(3),],
                            [new PotterBook(0), new PotterBook(1), new PotterBook(2),],
                            [new PotterBook(0), new PotterBook(1), new PotterBook(3),],
                            [new PotterBook(0), new PotterBook(2), new PotterBook(3),],
                            [new PotterBook(1), new PotterBook(2), new PotterBook(3),],
                            [new PotterBook(0), new PotterBook(1), new PotterBook(2), new PotterBook(3),],
                        ].map((l) => new PotterBookOrder(l));
    
                        expect(new PotterBookOrder([new PotterBook(0), new PotterBook(1), new PotterBook(2), new PotterBook(3),]).specialOrders()).toEqual(specialOrders);
                    });

                    it('an order with the first two books has three special sets', () => {
                        let specialOrders = [
                            [new PotterBook(0),],
                            [new PotterBook(1),],
                            [new PotterBook(0), new PotterBook(1),],
                        ].map((l) => new PotterBookOrder(l));

                        expect(new PotterBookOrder([new PotterBook(0), new PotterBook(0), new PotterBook(1),]).specialOrders()).toEqual(specialOrders);
                    });
                });
            });
        });
    });
});
