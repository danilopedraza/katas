import { PotterPriceCalculator } from '../src/potter';

describe('The Potter price calculator', () => {
 it('should return 0 when there are no books', () => {
     expect(new PotterPriceCalculator().getPrice([])).toEqual(0);
 });
});
