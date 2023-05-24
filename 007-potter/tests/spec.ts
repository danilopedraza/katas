import { Multiset, PotterPriceCalculator } from '../src/potter';

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
                describe('should preserve the number of elements', () => {
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

            describe('A multiset is contained in another', () => {
                describe('if all of its elements are in the other', () => {
                    describe('at least the same amount of times.', () => {
                        describe('An empty multiset is contained in every multiset,', () => {
                            it('like another empty multiset', () => {
                                expect(new Multiset().contained(new Multiset())).toBeTruthy;
                            });

                            it('like a single element multiset', () => {
                                expect(new Multiset().contained(new Multiset([0]))).toBeTruthy;
                            });
                        });

                        describe('A single element multiset', () => {
                            it('should not be contained in an empty multiset', () => {
                                expect(new Multiset([0]).contained(new Multiset())).toBeFalsy;
                            });
                        });
                    });
                });
            });
        });
    });
});

describe('A set partition of a multiset', () => {
    describe('is a multiset of non-empty sets (multisets with no repetitions)', () => {
        describe('which union results in the multiset.', () => {

        });
    });
});
