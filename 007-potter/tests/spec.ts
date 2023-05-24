import { allSetPartitions, Multiset, PotterPriceCalculator } from '../src/potter';

describe('The Potter price calculator', () => {
    it('should return 0 when there are no copies', () => {
        expect(new PotterPriceCalculator().getPrice([])).toEqual(0);
    });

    it("should return 8 when there is a single copy", () => {
        expect(new PotterPriceCalculator().getPrice([1])).toEqual(8);
    });

    it("should make no discounts when there are only copies of a single book", () => {
        expect(new PotterPriceCalculator().getPrice([1,1,1])).toEqual(24);
    });

    // it("should make a discount for two groups of four books", () => {
    //     expect(new PotterPriceCalculator().getPrice([0, 0, 1, 1, 2, 2, 3, 4]))
    //     .toEqual(2 * (8 * 4 * 0.8));
    // });
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
                        expect(new Multiset([0]).size).toEqual(1);
                    });

                    it('with an array of two equal elements', () => {
                        expect(new Multiset([0, 0]).size).toEqual(2);
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
                                expect(new Multiset().subset(new Multiset([0]))).toEqual(true);
                            });
                        });

                        describe('A single element multiset', () => {
                            it('should not be contained in an empty multiset', () => {
                                expect(new Multiset([0]).subset(new Multiset())).toEqual(false);
                            });
                        });

                        describe('A two-element multiset', () => {
                            it('should not be a subset of a single element multiset', () => {
                                expect(new Multiset([0,0]).subset(new Multiset([0]))).toEqual(false);
                            });

                            it('should not be a subset of a multiset with less repetitions in one element', () => {
                                expect(new Multiset([0,0]).subset(new Multiset([0,1]))).toEqual(false);
                            });
                        });
                    });
                });
            });

            describe('A multiset is equal to another multiset', () => {
                describe('if the one is a subset of the other and viceversa.', () => {
                    it('The order of the generating array doesn\'t matter', () => {
                        expect(new Multiset([0,1]).equals(new Multiset([1,0]))).toEqual(true);
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
                                expect(new Multiset([0]).union(new Multiset([0])).size).toEqual(2);
                            });
                        });
                    });
                });
            });
        });
    });
});

describe('A set partition of a multiset', () => {
    describe('is a list of non-empty sets (multisets with no repetitions)', () => {
        describe('which union results in the multiset.', () => {
            it('A single element multiset has a single set partition', () => {
                expect(allSetPartitions(new Multiset([0]))).toEqual([
                    [new Multiset([0])]
                ]);
            });
        });
    });
});
