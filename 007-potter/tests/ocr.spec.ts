import { PotterPriceCalculator } from '../src/potter';

describe('The Potter price calculator', () => {
    it('should return 0 when there are no copies', () => {
        expect(new PotterPriceCalculator().price([])).toEqual(0);
    });

    it("should return 8 when there is a single copy", () => {
        expect(new PotterPriceCalculator().price([1])).toEqual(8);
    });

    it("should make no discounts when there are only copies of a single book", () => {
        expect(new PotterPriceCalculator().price([1,1,1])).toEqual(24);
    });

    // it("should make a discount for two groups of four books", () => {
    //     expect(new PotterPriceCalculator().getPrice([0, 0, 1, 1, 2, 2, 3, 4]))
    //     .toEqual(2 * (8 * 4 * 0.8));
    // });
});
