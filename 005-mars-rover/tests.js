import { it, describe } from "mocha";
import { expect } from "chai";
import { movedRover, movedRovers } from "./code";

describe("When there is a single rover", () => {
    describe("and the rover is in the origin of a 1x1 plateau facing north", () => {
        describe("and the rover rotates left", () => {
            it("the new rover should be facing west", () => {
                expect(
                    movedRover(
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
                    movedRover(
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
                    movedRover(
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
                    movedRover(
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
                    movedRover(
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
                    movedRover(
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
                    movedRover(
                        {x: 0, y: 0, orientation: "N"},
                        "M",
                        {
                            size: {
                                width: 2,
                                length: 2,
                            },
                            cells: [
                                [true , false,],
                                [false, false,],
                            ],
                        }
                    )
                ).to.deep.equal(
                    {x: 0, y: 1, orientation: "N"}
                );
            });
        });
    });

    describe("and the rover is in the origin of a 2x2 plateau facing east", () => {
        describe("and the rover moves forward once", () => {
            it("the new rover should stay in (1, 0)", () => {
                expect(
                    movedRover(
                        {x: 0, y: 0, orientation: "E"},
                        "M",
                        {
                            size: {
                                width: 2,
                                length: 2,
                            },
                            cells: [
                                [true , false,],
                                [false, false,],
                            ],
                        }
                    )
                ).to.deep.equal(
                    {x: 1, y: 0, orientation: "E"}
                );
            });
        });

        describe("and the rover moves forward twice", () => {
            it("the new rover should stay in (1, 0)", () => {
                expect(
                    movedRover(
                        {x: 0, y: 0, orientation: "E"},
                        "MM",
                        {
                            size: {
                                width: 2,
                                length: 2,
                            },
                            cells: [
                                [true , false,],
                                [false, false,],
                            ],
                        }
                    )
                ).to.deep.equal(
                    {x: 1, y: 0, orientation: "E"}
                );
            });
        });
    });
});

describe("When there are two rovers in a 1x2 plateau", () => {
    describe("with one rover in the lower cell facing north", () => {
        describe("and the other in the upper cell facing south", () => {
            describe("and the lower rover moves forward once", () => {
                it("the lower rover should stay the same", () => {
                    expect(
                        movedRover(
                            {x: 0, y: 0, orientation: "N"},
                            "M",
                            {
                                size: {
                                    width: 1,
                                    length: 2,
                                },
                                cells: [
                                    [true,],
                                    [true,],
                                ],
                            }
                        )
                    ).to.deep.equal(
                        {x: 0, y: 0, orientation: "N"}
                    );
                });
            });

            describe("and both rovers move forward once", () => {
                it("the lower rover should stay the same", () => {
                    expect(
                        movedRover(
                            {x: 0, y: 0, orientation: "N"},
                            "M",
                            {
                                size: {
                                    width: 1,
                                    length: 2,
                                },
                                cells: [
                                    [true,],
                                    [true,],
                                ],
                            }
                        )
                    ).to.deep.equal(
                        {x: 0, y: 0, orientation: "N"}
                    );
                });

                it("the other rover should stay the same", () => {
                    expect(
                        movedRovers(
                            [
                                {
                                    rover:{x: 0, y: 0, orientation: "N"},
                                    moves: "M",
                                },
                                {
                                    rover:{x: 0, y: 1, orientation: "S"},
                                    moves: "M",
                                },
                            ],
                            {
                                size: {
                                    width: 1,
                                    length: 2,
                                },
                                cells: [
                                    [true,],
                                    [true,],
                                ],
                            }
                        )
                    ).to.deep.equal(
                        [
                            {x: 0, y: 0, orientation: "N"},
                            {x: 0, y: 1, orientation: "S"},
                        ]
                    );
                });
            });
        });
    })
});

describe("When there are two rovers in a 2x2 plateau" , () => {
    describe("with the first in the lower left corner facing north", () => {
        describe("and the second in the upper right corner facing west", () => {
            describe("and both of them move forward once", () => {
                it("the first rover should stay in (0, 1) and the second in (1, 1)", () => {
                    expect(
                        movedRovers(
                            [
                                {
                                    rover:{x: 0, y: 0, orientation: "N"},
                                    moves: "M",
                                },
                                {
                                    rover:{x: 1, y: 1, orientation: "W"},
                                    moves: "M",
                                },
                            ],
                            {
                                size: {
                                    width: 2,
                                    length: 2,
                                },
                                cells: [
                                    [true , false,],
                                    [false, true ,],
                                ],
                            }
                        )
                    ).to.deep.equal(
                        [
                            {x: 0, y: 1, orientation: "N"},
                            {x: 1, y: 1, orientation: "W"},
                        ]
                    );
                });
            });
        });
    });
});
