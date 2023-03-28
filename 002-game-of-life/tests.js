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

            it("A still life: the 'bee hive'", () => {
                const currentGrid = [
                    [false, false, false, false, false, false,],
                    [false, false, true , true , false, false,],
                    [false, true , false, false, true , false,],
                    [false, false, true , true , false, false,],
                    [false, false, false, false, false, false,],
                ];
    
                const expectedNextGrid =[
                    [false, false, false, false, false, false,],
                    [false, false, true , true , false, false,],
                    [false, true , false, false, true , false,],
                    [false, false, true , true , false, false,],
                    [false, false, false, false, false, false,],
                ];
    
                expect(functionsToTest.nextGrid(currentGrid)).to.deep.equal(expectedNextGrid);
            });

            it("An oscillator of period 2: the 'toad'", () => {
                const currentGrid = [
                    [false, false, false, false, false, false,],
                    [false, false, false, false, false, false,],
                    [false, false, true , true , true , false,],
                    [false, true , true , true , false, false,],
                    [false, false, false, false, false, false,],
                    [false, false, false, false, false, false,],
                ];
    
                const expectedNextGrid = [
                    [false, false, false, false, false, false,],
                    [false, false, false, true , false, false,],
                    [false, true , false, false, true , false,],
                    [false, true , false, false, true , false,],
                    [false, false, true , false, false, false,],
                    [false, false, false, false, false, false,],
                ];
    
                expect(functionsToTest.nextGrid(currentGrid)).to.deep.equal(expectedNextGrid);
            });
        });
    });

    describe("Tests for parsing the input", () => {
        describe("Gets a line like 'Generation n:' and return n, where n is a number", () => {
            it("The line of the example case", () => {
                const firstLineOfInput = "Generation 1:";
                const expectedNumber = 1;
                expect(functionsToTest.parseGeneration(firstLineOfInput)).to.equal(expectedNumber);
            });

            it("The same line but with a 2", () => {
                const firstLineOfInput = "Generation 2:";
                const expectedNumber = 2;
                expect(functionsToTest.parseGeneration(firstLineOfInput)).to.equal(expectedNumber);
            });

            it("The same line but with a 12", () => {
                const firstLineOfInput = "Generation 12:";
                const expectedNumber = 12;
                expect(functionsToTest.parseGeneration(firstLineOfInput)).to.equal(expectedNumber);
            });

            it("The same line but with a 012 (I don't want leading zeros)", () => {
                const firstLineOfInput = "Generation 012:";
                expect(() => functionsToTest.parseGeneration(firstLineOfInput)).to.throw();
            });

            it("A line different from the format", () => {
                const firstLineOfInput = "Geneation 1 :";
                expect(() => functionsToTest.parseGeneration(firstLineOfInput)).to.throw();
            });
        });

        describe("Gets a line with two numbers separated by a space and returns an object with the two numbers tagged as 'width' and 'height' respectively", () => {
            it("A line with two digits: '1 1'", () => {
                const secondLineOfInput = "1 1";
                const expectedDims = {height: 1, width: 1};

                expect(functionsToTest.parseDimensions(secondLineOfInput)).to.deep.equal(expectedDims);
            });

            it("A line with two digits: '1 2'", () => {
                const secondLineOfInput = "1 2";
                const expectedDims = {height: 1, width: 2};

                expect(functionsToTest.parseDimensions(secondLineOfInput)).to.deep.equal(expectedDims);
            });

            it("Bad format: '012-25' This test is an excuse to introduce a tougher verification of the input", () => {
                const secondLineOfInput = "012-25";

                expect(() => functionsToTest.parseDimensions(secondLineOfInput)).to.throw();
            });
        });

        describe("Gets an array of strings with the characters '.' and '*', returns the correspondent boolean array", () => {
            it("An array of one element: the string '..'", () => {
                const input = [".."];
                const expectedGrid = [[false, false,]];

                expect(functionsToTest.parseGrid(input)).to.deep.equal(expectedGrid);
            });

            it("An array of two elements: '..' and '*.'", () => {
                const input = ["..", "*."];
                const expectedGrid = [
                    [false, false,],
                    [true , false,],
                ];

                expect(functionsToTest.parseGrid(input)).to.deep.equal(expectedGrid);
            });

            it("The array of the example case", () => {
                const input = [
                    "........",
                    "....*...",
                    "...**...",
                    "........",
                ];
                const expectedGrid = [
                    [false, false, false, false, false, false, false, false,],
                    [false, false, false, false, true , false, false, false,],
                    [false, false, false, true , true , false, false, false,],
                    [false, false, false, false, false, false, false, false,],
                ];

                expect(functionsToTest.parseGrid(input)).to.deep.equal(expectedGrid);
            });
        });
    });
});
