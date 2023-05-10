import { it, describe } from "mocha";
import { expect } from "chai";
import { moved } from "./code";

describe("When there is a single rover", () => {
    describe("and the rover is in the origin of a 0x0 grid facing north", () => {
        describe("and the rover rotates left", () => {
            it("the new rover should be facing west", () => {
                expect(
                    moved(
                        {x: 0, y: 0, orientation: "N"},
                        "L"
                    )
                ).to.deep.equal(
                    {x: 0, y: 0, orientation: "W"}
                );
            });
        });

        describe("and the rover rotates left two times", () => {
            it("the new rover should be facing south", () => {
                expect(
                    moved(
                        {x: 0, y: 0, orientation: "N"},
                        "LL"
                    )
                ).to.deep.equal(
                    {x: 0, y: 0, orientation: "S"}
                );
            });
        });

        describe("and the rover rotates left three times", () => {
            it("the new rover should be facing east", () => {
                expect(
                    moved(
                        {x: 0, y: 0, orientation: "N"},
                        "LLL"
                    )
                ).to.deep.equal(
                    {x: 0, y: 0, orientation: "E"}
                );
            });
        });

        describe("and the rover rotates left four times", () => {
            it("the new rover should be facing north again", () => {
                expect(
                    moved(
                        {x: 0, y: 0, orientation: "N"},
                        "LLLL"
                    )
                ).to.deep.equal(
                    {x: 0, y: 0, orientation: "N"}
                );
            });
        });

        describe("and the rover rotates right", () => {
            it("the new rover should be facing east", () => {
                expect(
                    moved(
                        {x: 0, y: 0, orientation: "N"},
                        "R"
                    )
                ).to.deep.equal(
                    {x: 0, y: 0, orientation: "E"}
                );
            });
        });

        describe("and the rover rotates right four times", () => {
            it("the new rover should be facing north again", () => {
                expect(
                    moved(
                        {x: 0, y: 0, orientation: "N"},
                        "RRRR"
                    )
                ).to.deep.equal(
                    {x: 0, y: 0, orientation: "N"}
                );
            });
        });

        describe("and the rover moves forward once", () => {
            it("the new rover should stay in (0, 1)", () => {
                expect(
                    moved(
                        {x: 0, y: 0, orientation: "N"},
                        "M"
                    )
                ).to.deep.equal(
                    {x: 0, y: 1, orientation: "N"}
                );
            });
        });
    });

    describe("and the rover is in the origin of a 1x1 grid facing east", () => {
        describe("and the rover moves forward once", () => {
            it("the new rover should stay in (1, 0)", () => {
                expect(
                    moved(
                        {x: 0, y: 0, orientation: "E"},
                        "M"
                    )
                ).to.deep.equal(
                    {x: 1, y: 0, orientation: "E"}
                );
            });
        });
    });
});
