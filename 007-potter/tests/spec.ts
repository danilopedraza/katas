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
        });
    });
});

describe('A set partition of a multiset', () => {
    describe('is a multiset of non-empty sets (multisets with no repetitions)', () => {
        describe('which union results in the multiset.', () => {

        });
    });
});
