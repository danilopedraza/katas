import { it, describe } from "mocha";
import { expect } from "chai";
import { functions } from "./code";

describe("Tests para kata Poker Hands", () => {
    describe("readValue", () => {
        it("Value 1", () => {
            let actual = functions.readValue("1");
            expect(actual).to.equal(1);
        });
        it("Value 2", () => {
            let actual = functions.readValue("2");
            expect(actual).to.equal(2);
        });
        it("Value 3", () => {
            let actual = functions.readValue("3");
            expect(actual).to.equal(3);
        });
        it("Value 4", () => {
            let actual = functions.readValue("4");
            expect(actual).to.equal(4);
        });
        it("Value 5", () => {
            let actual = functions.readValue("5");
            expect(actual).to.equal(5);
        });
        it("Value 6", () => {
            let actual = functions.readValue("6");
            expect(actual).to.equal(6);
        });
        it("Value 7", () => {
            let actual = functions.readValue("7");
            expect(actual).to.equal(7);
        });
        it("Value 8", () => {
            let actual = functions.readValue("8");
            expect(actual).to.equal(8);
        });
        it("Value 9", () => {
            let actual = functions.readValue("9");
            expect(actual).to.equal(9);
        });
        it("Value T", () => {
            let actual = functions.readValue("T");
            expect(actual).to.equal(10);
        });
        it("Value J", () => {
            let actual = functions.readValue("J");
            expect(actual).to.equal(11);
        });
        it("Value Q", () => {
            let actual = functions.readValue("Q");
            expect(actual).to.equal(12);
        });
        it("Value K", () => {
            let actual = functions.readValue("K");
            expect(actual).to.equal(13);
        });
        it("Value A", () => {
            let actual = functions.readValue("A");
            expect(actual).to.equal(14);
        });
        it("Value 10 (illegal argument)", () => {
            let actual = () => functions.readValue("10");
            expect(actual).to.throw();
        });
        it("Empty array", () => {
            let actual = () => functions.readValue([]);
            expect(actual).to.throw();
        });
        it("A valid value with leading spaces", () => {
            let actual = () => functions.readValue("  1");
            expect(actual).to.throw();
        });
    });

    describe("readSuit", () => {
        it("Value C", () => {
            let actual = functions.readSuit("C");
            expect(actual).to.equal("C");
        });
        it("Value D", () => {
            let actual = functions.readSuit("D");
            expect(actual).to.equal("D");
        });
        it("Value H", () => {
            let actual = functions.readSuit("H");
            expect(actual).to.equal("H");
        });
        it("Value S", () => {
            let actual = functions.readSuit("S");
            expect(actual).to.equal("S");
        });
        it("A number", () => {
            let actual = () => functions.readSuit("23");
            expect(actual).to.throw();
        });
        it("Empty array", () => {
            let actual = () => functions.readSuit([]);
            expect(actual).to.throw();
        });
    });

    describe("readCard", () => {
        it("Value 2H", () => {
            let actual = functions.readCard("2H");
            expect(actual).to.deep.equal({
                value: 2,
                suit: "H",
            });
        });
        it("Value 3D", () => {
            let actual = functions.readCard("3D");
            expect(actual).to.deep.equal({
                value: 3,
                suit: "D",
            });
        });
        it("Value KS", () => {
            let actual = functions.readCard("KS");
            expect(actual).to.deep.equal({
                value: 13,
                suit: "S",
            });
        });
        it("Empty string", () => {
            let actual = () => functions.readCard("");
            expect(actual).to.throw();
        });
        it("Large string", () => {
            let actual = () => functions.readCard("kskfsl");
            expect(actual).to.throw(undefined);
        });
        it("Good length but bad values", () => {
            let actual = () => functions.readCard("1K");
            expect(actual).to.throw();
        });
        it("Good length but bad values", () => {
            let actual = () => functions.readCard("ZH");
            expect(actual).to.throw();
        });
        it("Good length but bad values", () => {
            let actual = () => functions.readCard("MM");
            expect(actual).to.throw();
        });
    });

    describe("readHand", () => {
        it("Value 2H 3D 5S 9C KD", () => {
            let actual = functions.readHand("2H 3D 5S 9C KD");
            expect(actual).to.deep.equal(
                [
                    functions.readCard("2H"),
                    functions.readCard("3D"),
                    functions.readCard("5S"),
                    functions.readCard("9C"),
                    functions.readCard("KD"),
                ]
            );
        });
        it("Value '2H 3D 5S 9C KD  ' (spaces at the end))", () => {
            let actual = () => functions.readHand("2H 3D 5S 9C KD  ");
            expect(actual).to.throw();
        });
        it("Value '2H 3D 5S 9C KD 2C' (6 cards))", () => {
            let actual = () => functions.readHand("2H 3D 5S 9C KD 2C");
            expect(actual).to.throw();
        });
        it("Value '2H 3D 5S 9C KY' (with an illegal card))", () => {
            let actual = () => functions.readHand("2H 3D 5S 9C KY");
            expect(actual).to.throw();
        });
        it("Value 'II JJ SS ED KY' (every card is illegal))", () => {
            let actual = () => functions.readHand("2H 3D 5S 9C KY");
            expect(actual).to.throw();
        });
    });

    describe("readPlayer", () => {
        it("Value 'Black: 2H 3D 5S 9C KD'", () => {
            let actual = functions.readPlayer("Black: 2H 3D 5S 9C KD");
            expect(actual).to.deep.equal(
                {
                    player: "Black",
                    hand: functions.readHand("2H 3D 5S 9C KD"),
                }
            );
        });
        it("Value 'Black: 2H 3D 5S 9C XD' (illegal card)", () => {
            let actual = () => functions.readPlayer("Black: 2H 3D 5S 9C XD");
            expect(actual).to.throw();
        });
        it("Value 'Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH' (A game instead of just a player)", () => {
            let actual = () => functions.readPlayer("Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH");
            expect(actual).to.throw();
        });
        it("Value 'Black: 2H 3D 5S 9C KD: dd' (Just weird input with a similar problem)", () => {
            let actual = () => functions.readPlayer("Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH");
            expect(actual).to.throw();
        });
    });

    describe("readGame", () => {
        it("Value 'Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH'", () => {
            let actual = functions.readGame("Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH");
            expect(actual).to.deep.equal(
                [
                    functions.readPlayer("Black: 2H 3D 5S 9C KD"),
                    functions.readPlayer("White: 2C 3H 4S 8C AH"),
                ]
            );
        });
        it("Game with three players", () => {
            let actual = () => functions.readGame("Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH  Red: 2H 4S 4C 2D 4H");
            expect(actual).to.throw();
        });
    });

    describe("isStraight", () => {
        it("2H 3D 5S 9C KD (not straight)", () => {
            let actual = functions.isStraight(
                functions.readHand("2H 3D 5S 9C KD")
            );
            expect(actual).to.equal(0);
        });
        it("2C 3H 4S 8C AH (not straight)", () => {
            let actual = functions.isStraight(
                functions.readHand("2C 3H 4S 8C AH")
            );
            expect(actual).to.equal(0);
        });
        it("2H 4S 4C 2D 4H (not straight)", () => {
            let actual = functions.isStraight(
                functions.readHand("2H 4S 4C 2D 4H")
            );
            expect(actual).to.equal(0);
        });
        it("2S 8S AS QS 3S (not straight)", () => {
            let actual = functions.isStraight(
                functions.readHand("2S 8S AS QS 3S")
            );
            expect(actual).to.equal(0);
        });
        it("AS KS QS JS TS (straight)", () => {
            let actual = functions.isStraight(
                functions.readHand("AS KS QS JS TS")
            );
            expect(actual).to.equal(14);
        });
        it("1C 4D 2H 3S 5S (straight)", () => {
            let actual = functions.isStraight(
                functions.readHand("1C 4D 2H 3S 5S")
            );
            expect(actual).to.equal(5);
        });
        it("8C 9D TH JS QS (straight)", () => {
            let actual = functions.isStraight(
                functions.readHand("8C 9D TH JS QS")
            );
            expect(actual).to.equal(12);
        });
    });

    describe("highCardRank", () => {
        it("2H 3D 5S 9C KD (K)", () => {
            let actual = functions.highCardRank(
                functions.readHand("2H 3D 5S 9C KD")
            );
            expect(actual).to.equal(13);
        });
        it("2C 3H 4S 8C AH (A)", () => {
            let actual = functions.highCardRank(
                functions.readHand("2C 3H 4S 8C AH")
            );
            expect(actual).to.equal(14);
        });
        it("2H 4S 4C 2D 4H (2)", () => {
            let actual = functions.highCardRank(
                functions.readHand("2H 4S 4C 2D 4H")
            );
            expect(actual).to.equal(2);
        });
        it("2S 8S AS QS 3S (A)", () => {
            let actual = functions.highCardRank(
                functions.readHand("2S 8S AS QS 3S")
            );
            expect(actual).to.equal(14);
        });
        it("AS KS QS JS TS (A)", () => {
            let actual = functions.highCardRank(
                functions.readHand("AS KS QS JS TS")
            );
            expect(actual).to.equal(14);
        });
        it("1C 4D 2H 3S 5S (5)", () => {
            let actual = functions.highCardRank(
                functions.readHand("1C 4D 2H 3S 5S")
            );
            expect(actual).to.equal(5);
        });
        it("8C 9D TH JS QS (Q)", () => {
            let actual = functions.highCardRank(
                functions.readHand("8C 9D TH JS QS")
            );
            expect(actual).to.equal(12);
        });
        it("AS AS QS QS 1S (1)", () => {
            let actual = functions.highCardRank(
                functions.readHand("AS AS QS QS 1S")
            );
            expect(actual).to.equal(1);
        });
    });

    describe("isFlush", () => {
        it("2H 3D 5S 9C KD (not flush)", () => {
            let actual = functions.isFlush(
                functions.readHand("2H 3D 5S 9C KD")
            );
            expect(actual).to.equal(0);
        });
        it("2C 3H 4S 8C AH (not flush)", () => {
            let actual = functions.isFlush(
                functions.readHand("2C 3H 4S 8C AH")
            );
            expect(actual).to.equal(0);
        });
        it("2H 4S 4C 2D 4H (not flush)", () => {
            let actual = functions.isFlush(
                functions.readHand("2H 4S 4C 2D 4H")
            );
            expect(actual).to.equal(0);
        });
        it("2S 8S AS QS 3S (flush)", () => {
            let actual = functions.isFlush(
                functions.readHand("2S 8S AS QS 3S")
            );
            expect(actual).to.equal(14);
        });
        it("AS KS QS JS TS (flush)", () => {
            let actual = functions.isFlush(
                functions.readHand("AS KS QS JS TS")
            );
            expect(actual).to.equal(14);
        });
        it("1C 4D 2H 3S 5S (not flush)", () => {
            let actual = functions.isFlush(
                functions.readHand("1C 4D 2H 3S 5S")
            );
            expect(actual).to.equal(0);
        });
        it("8C 9D TH JS QS (not flush)", () => {
            let actual = functions.isFlush(
                functions.readHand("8C 9D TH JS QS")
            );
            expect(actual).to.equal(0);
        });
        it("AS AS QS QS 1S (flush)", () => {
            let actual = functions.isFlush(
                functions.readHand("AS AS QS QS 1S")
            );
            expect(actual).to.equal(1);
        });
    });

    describe("isStraightFlush", () => {
        it("2H 3D 5S 9C KD (not straight flush)", () => {
            let actual = functions.isStraightFlush(
                functions.readHand("2H 3D 5S 9C KD")
            );
            expect(actual).to.equal(0);
        });
        it("2C 3H 4S 8C AH (not straight flush)", () => {
            let actual = functions.isStraightFlush(
                functions.readHand("2C 3H 4S 8C AH")
            );
            expect(actual).to.equal(0);
        });
        it("2H 4S 4C 2D 4H (not straight flush)", () => {
            let actual = functions.isStraightFlush(
                functions.readHand("2H 4S 4C 2D 4H")
            );
            expect(actual).to.equal(0);
        });
        it("2S 8S AS QS 3S (not straight flush)", () => {
            let actual = functions.isStraightFlush(
                functions.readHand("2S 8S AS QS 3S")
            );
            expect(actual).to.equal(0);
        });
        it("AS KS QS JS TS (straight flush)", () => {
            let actual = functions.isStraightFlush(
                functions.readHand("AS KS QS JS TS")
            );
            expect(actual).to.equal(14);
        });
        it("1C 4D 2H 3S 5S (not straight flush)", () => {
            let actual = functions.isStraightFlush(
                functions.readHand("1C 4D 2H 3S 5S")
            );
            expect(actual).to.equal(0);
        });
        it("8C 9D TH JS QS (not straight flush)", () => {
            let actual = functions.isStraightFlush(
                functions.readHand("8C 9D TH JS QS")
            );
            expect(actual).to.equal(0);
        });
        it("AS AS QS QS 1S (not straight flush)", () => {
            let actual = functions.isStraightFlush(
                functions.readHand("AS AS QS QS 1S")
            );
            expect(actual).to.equal(0);
        });
    });

    describe("isPair", () => {
        it("2H 3D 5S 9C KD (not pair)", () => {
            let actual = functions.isPair(
                functions.readHand("2H 3D 5S 9C KD")
            );
            expect(actual).to.equal(0);
        });
        it("2C 3H 4S 8C AH (not pair)", () => {
            let actual = functions.isPair(
                functions.readHand("2C 3H 4S 8C AH")
            );
            expect(actual).to.equal(0);
        });
        it("2H 4S 4C 2D 4H (pair)", () => {
            let actual = functions.isPair(
                functions.readHand("2H 4S 4C 2D 4H")
            );
            expect(actual).to.equal(2);
        });
        it("2S 8S AS QS 3S (not pair)", () => {
            let actual = functions.isPair(
                functions.readHand("2S 8S AS QS 3S")
            );
            expect(actual).to.equal(0);
        });
        it("AS KS QS JS TS (not pair)", () => {
            let actual = functions.isPair(
                functions.readHand("AS KS QS JS TS")
            );
            expect(actual).to.equal(0);
        });
        it("1C 4D 2H 3S 5S (not pair)", () => {
            let actual = functions.isPair(
                functions.readHand("1C 4D 2H 3S 5S")
            );
            expect(actual).to.equal(0);
        });
        it("8C 9D TH JS QS (not pair)", () => {
            let actual = functions.isPair(
                functions.readHand("8C 9D TH JS QS")
            );
            expect(actual).to.equal(0);
        });
        it("AS AS QS QS 1S (pair)", () => {
            let actual = functions.isPair(
                functions.readHand("AS AS QS QS 1S")
            );
            expect(actual).to.equal(14);
        });
    });

    describe("isTwoPairs", () => {
        it("2H 3D 5S 9C KD (not two pairs)", () => {
            let actual = functions.isTwoPairs(
                functions.readHand("2H 3D 5S 9C KD")
            );
            expect(actual).to.equal(0);
        });
        it("2C 3H 4S 8C AH (not two pairs)", () => {
            let actual = functions.isTwoPairs(
                functions.readHand("2C 3H 4S 8C AH")
            );
            expect(actual).to.equal(0);
        });
        it("2H 4S 4C 2D 4H (not two pairs)", () => {
            let actual = functions.isTwoPairs(
                functions.readHand("2H 4S 4C 2D 4H")
            );
            expect(actual).to.equal(0);
        });
        it("2S 8S AS QS 3S (not two pairs)", () => {
            let actual = functions.isTwoPairs(
                functions.readHand("2S 8S AS QS 3S")
            );
            expect(actual).to.equal(0);
        });
        it("AS KS QS JS TS (not two pairs)", () => {
            let actual = functions.isTwoPairs(
                functions.readHand("AS KS QS JS TS")
            );
            expect(actual).to.equal(0);
        });
        it("1C 4D 2H 3S 5S (not two pairs)", () => {
            let actual = functions.isTwoPairs(
                functions.readHand("1C 4D 2H 3S 5S")
            );
            expect(actual).to.equal(0);
        });
        it("8C 9D TH JS QS (not two pairs)", () => {
            let actual = functions.isTwoPairs(
                functions.readHand("8C 9D TH JS QS")
            );
            expect(actual).to.equal(0);
        });
        it("AS AS QS QS 1S (two pairs)", () => {
            let actual = functions.isTwoPairs(
                functions.readHand("AS AS QS QS 1S")
            );
            expect(actual).to.equal(1);
        });
    });

    describe("isThreeOfAKind", () => {
        it("2H 3D 5S 9C KD (not tk)", () => {
            let actual = functions.isThreeOfAKind(
                functions.readHand("2H 3D 5S 9C KD")
            );
            expect(actual).to.equal(0);
        });
        it("2C 3H 4S 8C AH (not tk)", () => {
            let actual = functions.isThreeOfAKind(
                functions.readHand("2C 3H 4S 8C AH")
            );
            expect(actual).to.equal(0);
        });
        it("2H 4S 4C 2D 4H (tk)", () => {
            let actual = functions.isThreeOfAKind(
                functions.readHand("2H 4S 4C 2D 4H")
            );
            expect(actual).to.equal(4);
        });
        it("2S 8S AS QS 3S (not tk)", () => {
            let actual = functions.isThreeOfAKind(
                functions.readHand("2S 8S AS QS 3S")
            );
            expect(actual).to.equal(0);
        });
        it("AS KS QS JS TS (not tk)", () => {
            let actual = functions.isThreeOfAKind(
                functions.readHand("AS KS QS JS TS")
            );
            expect(actual).to.equal(0);
        });
        it("1C 4D 2H 3S 5S (not tk)", () => {
            let actual = functions.isThreeOfAKind(
                functions.readHand("1C 4D 2H 3S 5S")
            );
            expect(actual).to.equal(0);
        });
        it("8C 9D TH JS QS (not tk)", () => {
            let actual = functions.isThreeOfAKind(
                functions.readHand("8C 9D TH JS QS")
            );
            expect(actual).to.equal(0);
        });
        it("AS AS QS QS 1S (not tk)", () => {
            let actual = functions.isThreeOfAKind(
                functions.readHand("AS AS QS QS 1S")
            );
            expect(actual).to.equal(0);
        });
    });

    describe("isFullHouse", () => {
        it("2H 3D 5S 9C KD (not fh)", () => {
            let actual = functions.isFullHouse(
                functions.readHand("2H 3D 5S 9C KD")
            );
            expect(actual).to.equal(0);
        });
        it("2C 3H 4S 8C AH (not fh)", () => {
            let actual = functions.isFullHouse(
                functions.readHand("2C 3H 4S 8C AH")
            );
            expect(actual).to.equal(0);
        });
        it("2H 4S 4C 2D 4H (fh)", () => {
            let actual = functions.isFullHouse(
                functions.readHand("2H 4S 4C 2D 4H")
            );
            expect(actual).to.equal(4);
        });
        it("2S 8S AS QS 3S (not fh)", () => {
            let actual = functions.isFullHouse(
                functions.readHand("2S 8S AS QS 3S")
            );
            expect(actual).to.equal(0);
        });
        it("AS KS QS JS TS (not fh)", () => {
            let actual = functions.isFullHouse(
                functions.readHand("AS KS QS JS TS")
            );
            expect(actual).to.equal(0);
        });
        it("1C 4D 2H 3S 5S (not fh)", () => {
            let actual = functions.isFullHouse(
                functions.readHand("1C 4D 2H 3S 5S")
            );
            expect(actual).to.equal(0);
        });
        it("8C 9D TH JS QS (not fh)", () => {
            let actual = functions.isFullHouse(
                functions.readHand("8C 9D TH JS QS")
            );
            expect(actual).to.equal(0);
        });
        it("AS AS QS QS 1S (not fh)", () => {
            let actual = functions.isFullHouse(
                functions.readHand("AS AS QS QS 1S")
            );
            expect(actual).to.equal(0);
        });
    });

    describe("isFourOfAKind", () => {
        it("AC AD AH AH 1S (4k)", () => {
            let actual = functions.isFourOfAKind(
                functions.readHand("AC AD AH AH 1S")
            );
            expect(actual).to.equal(14);
        });
        it("2C AD AH AH 1S (not 4k)", () => {
            let actual = functions.isFourOfAKind(
                functions.readHand("2C AD AH AH 1S")
            );
            expect(actual).to.equal(0);
        });
    });

    describe("decideGame", () => {
        it("example case #1", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH")
            );
            expect(actual).to.equal("White wins. - with high card: Ace");
        });
        it("example case #2", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: 2H 4S 4C 2D 4H  White: 2S 8S AS QS 3S")
            );
            expect(actual).to.equal("Black wins. - with full house: 4 over 2");
        });
        it("example case #3", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C KH")
            );
            expect(actual).to.equal("Black wins. - with high card: 9");
        });
        it("example case #4", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: 2H 3D 5S 9C KD  White: 2D 3H 5C 9S KH")
            );
            expect(actual).to.equal("Tie.");
        });
        it("example case #5", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: 1D 2D 3D 4D 5D  White: 4S 5S 1S 2S 3S")
            );
            expect(actual).to.equal("Tie.");
        });
        it("example case #6", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: 1D 2D 3D 4D 5D  White: 4D 5S 1S 2S 3S")
            );
            expect(actual).to.equal("Black wins. - with straight flush: 5");
        });
        it("example case #7", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: 1D 5D 3C 8D AD  White: 4D 4S 4S 4S 3S")
            );
            expect(actual).to.equal("White wins. - with four of a kind: 4 over 3");
        });
        it("example case #8", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: 1D 5D 3C 8D AD  White: 2S 1S AS 4S 3S")
            );
            expect(actual).to.equal("White wins. - with flush: Ace");
        });
        it("example case #9", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: TD KD JC QD AS  White: 2H 1C AS 4S 3S")
            );
            expect(actual).to.equal("Black wins. - with straight: Ace");
        });
        it("example case #10", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: 2D 5D 3C 8C 2D  White: QS 1C QH 4D QS")
            );
            expect(actual).to.equal("White wins. - with three of a kind: Queen");
        });
        it("example case #11", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: 2D 2D 1C 1C 5D  White: 1S 1C 5H 4D QS")
            );
            expect(actual).to.equal("Black wins. - with two pairs: 2");
        });
        it("example case #12", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: TD 8D 2C 1C 5H  White: AD AD 2C 1C 5H")
            );
            expect(actual).to.equal("White wins. - with pair: Ace");
        });
        it("example case #13 (two four of a kind)", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: QD QD QC QC AH  White: KD KD KC KC 5H")
            );
            expect(actual).to.equal("White wins. - with high card: King");
        });
        it("example case #14 (two four of a kind)", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: QD QD QC QC 5H  White: QD QD QC QC 2H")
            );
            expect(actual).to.equal("Black wins. - with high card: 5");
        });
        it("example case #15 (two full houses)", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: QD QD QC 5C 5H  White: AD AD AC 2C 2H")
            );
            expect(actual).to.equal("White wins. - with high card: Ace");
        });
        it("example case #16 (two full houses)", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: QD QD QC 5C 5H  White: QD QD QC 2C 2H")
            );
            expect(actual).to.equal("Black wins. - with high card: 5");
        });
        it("example case #17 (two flushes)", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: QD 3D 4D 5D 5D  White: 1C 2C 4C 2C 2C")
            );
            expect(actual).to.equal("Black wins. - with high card: Queen");
        });
        it("example case #18 (two straights)", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: QD TS AD KH JD  White: 1C 2H 4D 3C 5C")
            );
            expect(actual).to.equal("Black wins. - with high card: Ace");
        });
        it("example case #19 (two three of a kind)", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: QD QS QD AH JD  White: QC 2H QD QC 5C")
            );
            expect(actual).to.equal("Black wins. - with high card: Ace");
        });
        it("example case #20 (two two pairs)", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: QD QS AD AH 2D  White: QC QH AD AC 5C")
            );
            expect(actual).to.equal("White wins. - with high card: 5");
        });
        it("example case #21 (two pairs)", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: QD QS 1D AH 2D  White: QC QH 4D AC 5C")
            );
            expect(actual).to.equal("White wins. - with high card: 5");
        });
        it("example case #22 (two full houses)", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: 2D 2S 2D QH QD  White: AC AH 1D 1C 1C")
            );
            expect(actual).to.equal("Black wins. - with high card: 2");
        });
        it("example case #23 (two three of a kind)", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: 2D 2S 2D QH 1D  White: AC KH 1D 1C 1C")
            );
            expect(actual).to.equal("Black wins. - with high card: 2");
        });
        it("example case #24 (two two pairs)", () => {
            let actual = functions.decideGame(
                functions.readGame("Black: 2D 2S 1D 1H AD  Green: 1C 1H 3D 3C 2C")
            );
            expect(actual).to.equal("Green wins. - with high card: 3");
        });
        it("example case #25 (two pairs)", () => {
            let actual = functions.decideGame(
                functions.readGame("AAAAA: 2D 2S 1D 3H 4D  dkdkjde: 1C 1H AD 5C 4C")
            );
            expect(actual).to.equal("AAAAA wins. - with high card: 2");
        });
    });
});
