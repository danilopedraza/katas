import { it, describe } from "mocha";
import { expect } from "chai";
import * as functionsToTest from "./code";

describe("Tests for 'Game of life' kata", () => {
    describe("Tests for getting the next state of a grid", () => {
        describe(`Gets an array of booleans and returns
        another array of booleans representing the next state (always in a 3x3 grid)`, () => {
            it("Array with only dead cells", () => {
                const currentGrid = [
                    [false, false, false,],
                    [false, false, false,],
                    [false, false, false,],
                ];

                const expectedNextGrid = [
                    [false, false, false,],
                    [false, false, false,],
                    [false, false, false,],
                ];

                expect(functionsToTest.nextGrid(currentGrid)).to.deep.equal(expectedNextGrid);
            });

            it("Array with only one live cell", () => {
                const currentGrid = [
                    [false, false, false,],
                    [false, true , false,],
                    [false, false, false,],
                ];

                const expectedNextGrid = [
                    [false, false, false,],
                    [false, false, false,],
                    [false, false, false,],
                ];

                expect(functionsToTest.nextGrid(currentGrid)).to.deep.equal(expectedNextGrid);
            });

            it("Array with only two live cells", () => {
                const currentGrid = [
                    [false, true , false,],
                    [false, true , false,],
                    [false, false, false,],
                ];

                const expectedNextGrid = [
                    [false, false, false,],
                    [false, false, false,],
                    [false, false, false,],
                ];

                expect(functionsToTest.nextGrid(currentGrid)).to.deep.equal(expectedNextGrid);
            });

            it("Array with only three live cells (a vertical line in the middle)", () => {
                const currentGrid = [
                    [false, true , false,],
                    [false, true , false,],
                    [false, true , false,],
                ];

                const expectedNextGrid = [
                    [false, false, false,],
                    [true , true , true ,],
                    [false, false, false,],
                ];

                expect(functionsToTest.nextGrid(currentGrid)).to.deep.equal(expectedNextGrid);
            });

            it("Array with four live cells (a vertical line in the middle and one cell in the middle right)", () => {
                const currentGrid = [
                    [false, true , false,],
                    [false, true , true ,],
                    [false, true , false,],
                ];

                const expectedNextGrid = [
                    [false, true , true ,],
                    [true , true , true ,],
                    [false, true , true ,]
                ];

                expect(functionsToTest.nextGrid(currentGrid)).to.deep.equal(expectedNextGrid);
            });

            it("Array with five live cells (a cross)", () => {
                const currentGrid = [
                    [false, true , false,],
                    [true , true , true ,],
                    [false, true , false,]
                ];

                const expectedNextGrid = [
                    [true , true , true ,],
                    [true , false, true ,],
                    [true , true , true ,]
                ];

                expect(functionsToTest.nextGrid(currentGrid)).to.deep.equal(expectedNextGrid);
            });

            it("Three live cells separated from each other, but are neighbors of a commmon cell", () => {
                const currentGrid = [
                    [false, true , false,],
                    [false, false, false,],
                    [true , false, true ,]
                ];

                const expectedNextGrid = [
                    [false, false, false,],
                    [false, true , false,],
                    [false, false, false,]
                ];

                expect(functionsToTest.nextGrid(currentGrid)).to.deep.equal(expectedNextGrid);
            });

            it("Five live cells (an X)", () => {
                const currentGrid = [
                    [true , false, true ,],
                    [false, true , false,],
                    [true , false, true ,]
                ];

                const expectedNextGrid = [
                    [false, true , false,],
                    [true , false, true ,],
                    [false, true , false,]
                ];

                expect(functionsToTest.nextGrid(currentGrid)).to.deep.equal(expectedNextGrid);
            });

            it("A cross with the center cell and corner cell dead", () => {
                const currentGrid = [
                    [true , false, false,],
                    [false, false, false,],
                    [true , false, true ,]
                ];

                const expectedNextGrid = [
                    [false, false, false,],
                    [false, true , false,],
                    [false, false, false,]
                ];

                expect(functionsToTest.nextGrid(currentGrid)).to.deep.equal(expectedNextGrid);
            });
        });

        describe("The same that the category above, but with new array sizes", () => {
            it("4x4 array with only dead cells", () => {
                const currentGrid = [
                    [false, false, false, false],
                    [false, false, false, false],
                    [false, false, false, false],
                    [false, false, false, false],
                ];
    
                const expectedNextGrid = [
                    [false, false, false, false],
                    [false, false, false, false],
                    [false, false, false, false],
                    [false, false, false, false],
                ];
    
                expect(functionsToTest.nextGrid(currentGrid)).to.deep.equal(expectedNextGrid);
            });

            it("The test that came with the problem description (4x8 grid, three alive cells)", () => {
                const currentGrid = [
                    [false, false, false, false, false, false, false, false,],
                    [false, false, false, false, true , false, false, false,],
                    [false, false, false, true , true , false, false, false,],
                    [false, false, false, false, false, false, false, false,],
                ];
    
                const expectedNextGrid = [
                    [false, false, false, false, false, false, false, false,],
                    [false, false, false, true , true , false, false, false,],
                    [false, false, false, true , true , false, false, false,],
                    [false, false, false, false, false, false, false, false,],
                ];
    
                expect(functionsToTest.nextGrid(currentGrid)).to.deep.equal(expectedNextGrid);
            });
        });
    });
});
