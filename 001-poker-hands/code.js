// Nombres:
// card, suit, value, deck
// carta, mazo, valor, baraja

// Ejemplos de entrada/salida:
/*
Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH
White wins. - with high card: Ace

Black: 2H 4S 4C 2D 4H  White: 2S 8S AS QS 3S
Black wins. - with full house: 4 over 2

Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C KH
Black wins. - with high card: 9

Black: 2H 3D 5S 9C KD  White: 2D 3H 5C 9S KH
Tie.
*/

// Pasos:
// Leer valor
// Leer mazo
// Leer carta
// Leer mano
// Leer mano con jugador
// Leer juego
// Verificar cada caso para una mano
// Comparar manos y tomar decisiones


function readValue(input) {
    if (!/^[1-9TJQKA]$/.test(input))
        throw new Error("Valor de carta inválido");
        
    switch (input) {
        case "T": return 10;
        case "J": return 11;
        case "Q": return 12;
        case "K": return 13;
        case "A": return 14;
        default : return parseInt(input);
    }
}

function readSuit(input) {
    if (/^[CDHS]$/.test(input))
        return input;
    else
        throw new Error("Palo de carta inválido");
}

function readCard(input) {
    const splitted = input.split('');
    if (splitted.length !== 2)
        throw new Error("Formato de carta inválido");

    const value = readValue(splitted[0]);
    
    const suit = readSuit(splitted[1]);
    
    return {
        value,
        suit,
    };
}

function readHand(input) {
    const splitted = input.split(" ").map(readCard);
    if (splitted.length != 5)
        throw new Error("Formato de mano inválido");
    
    return splitted;
}

function readPlayer(input) {
    const playerAndHand = input.split(": ");
    if (playerAndHand.length != 2)
        throw new Error("Formato de carta y jugador inválido");

    const player = playerAndHand[0];
    const hand = readHand(playerAndHand[1]);
    
    return {
        player,
        hand,
    }
}

function readGame(input) {
    const players = input.split("  ").map(readPlayer);
    if (players.length != 2)
        throw new Error("Formato de juego inválido");
    
    return players;
}

function isStraight(hand) {
    const sortedValues = hand.map(
        card => card.value
    ).sort((a,b) => a-b);

    const allDistinct = (new Set(sortedValues)).size === 5;
    const allConsecutive = sortedValues[4] - sortedValues[0] === 4;
    
    if (allDistinct && allConsecutive)
        return sortedValues[4];
    else
        return 0;
}

function sortedDistinctValues(hand) {
    let valuesAndRepetitions = {};
    hand.map(card => card.value).forEach(value => {
        if (value in valuesAndRepetitions)
            valuesAndRepetitions[value]++;
        else
            valuesAndRepetitions[value] = 1;
    });

    let sorted = [];
    for (const value in valuesAndRepetitions)
        sorted.push({
            value: parseInt(value),
            repetitions: valuesAndRepetitions[value],
        });
    
    return sorted.sort((a,b)=>b.value-a.value);
}

function highCardRank(hand) {
    let sorted = sortedDistinctValues(hand);
    
    const firstWithOneCard = sorted.find(
        count => count.repetitions === 1
    );

    if (typeof firstWithOneCard !== 'undefined')
        return firstWithOneCard.value;
    else
        return sorted.pop().value;
}

function isFlush(hand) {
    const differentSuits = new Set(hand.map(card => card.suit));

    if (differentSuits.size === 1)
        return highCardRank(hand);
    else
        return 0;
}

function isStraightFlush(hand) {
    const straight = isStraight(hand);
    const flush = isFlush(hand);
    if (straight && flush)
        return straight;
    else
        return 0;
}

function isPair(hand) {
    const distinct = sortedDistinctValues(hand);

    const firstPair = distinct.find(
        count => count.repetitions === 2
    );

    if (typeof firstPair !== 'undefined')
        return firstPair.value;
    else
        return 0;
}

function isTwoPairs(hand) {
    const distinct = sortedDistinctValues(hand);
    const pairs = distinct.reduce(
        (acc, cur) => acc + (cur.repetitions === 2? 1 : 0),
        0
    );

    if (pairs === 2)
        return distinct.find(
            count => count.repetitions === 1
        ).value;
    else
        return 0;
}

function isThreeOfAKind(hand) {
    const distinct = sortedDistinctValues(hand);
    const triad = distinct.find(
        count => count.repetitions === 3
    );

    if (typeof triad !== 'undefined')
        return triad.value;
    else
        return 0;
}

function isFullHouse(hand) {
    const triadValue = isThreeOfAKind(hand);
    const pairValue = isPair(hand);
    
    if (triadValue && pairValue)
        return triadValue;
    else
        return 0;
}

function isFourOfAKind(hand) {
    const distinct = sortedDistinctValues(hand);
    const four = distinct.find(
        count => count.repetitions === 4
    );

    if (typeof four !== 'undefined')
        return four.value;
    else
        return 0;
}

function untieByhighCard(firstPlayer, secondPlayer, sortByRepsFirst) {
    const valueToName = [
        null,
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
        "Jack", "Queen", "King", "Ace",
    ]

    let firstSorted = sortedDistinctValues(firstPlayer.hand);
    let secondSorted = sortedDistinctValues(secondPlayer.hand);
    if (sortByRepsFirst) {
        firstSorted.sort((a,b) => 
            b.repetitions-a.repetitions !== 0 ?
                b.repetitions-a.repetitions :
                b.value-a.value
        );
        secondSorted.sort((a,b) => 
        b.repetitions-a.repetitions !== 0 ?
            b.repetitions-a.repetitions :
            b.value-a.value
        );
    }
                
    for (let i = 0; i < 5; i++)
        if      (firstSorted[i].value > secondSorted[i].value)
            return firstPlayer.player
                 + " wins. - with high card: "
                 + valueToName[firstSorted[i].value];
        else if (firstSorted[i].value < secondSorted[i].value)
            return secondPlayer.player
                 + " wins. - with high card: "
                 + valueToName[secondSorted[i].value];

    return "Tie.";
}

function decideGame(game) {
    const combinations = [
        isStraightFlush,
        isFourOfAKind,
        isFullHouse,
        isFlush,
        isStraight,
        isThreeOfAKind,
        isTwoPairs,
        isPair,
        (hand) => true, // for high card
    ];

    const valueToName = [
        null,
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
        "Jack", "Queen", "King", "Ace",
    ]

    const firstPlayer = game[0];
    const secondPlayer = game[1];

    const firstRank = combinations.findIndex(
        func => func(firstPlayer.hand)
    );
    const secondRank = combinations.findIndex(
        func => func(secondPlayer.hand)
    );

    if (firstRank !== secondRank) {
        const whoWins = firstRank < secondRank;
        const winner = whoWins ? firstPlayer : secondPlayer;
        const winnerRank = whoWins ? firstRank : secondRank;

        switch (winnerRank) {
            case 0:
                return winner.player
                     + " wins. - with straight flush: "
                     + valueToName[sortedDistinctValues(winner.hand)[0].value];
            case 1:
                return winner.player
                     + " wins. - with four of a kind: "
                     + valueToName[sortedDistinctValues(winner.hand).find(
                        count => count.repetitions === 4).value]
                     + " over "
                     + valueToName[sortedDistinctValues(winner.hand).find(
                        count => count.repetitions === 1).value];
            case 2:
                return winner.player
                     + " wins. - with full house: "
                     + valueToName[sortedDistinctValues(winner.hand).find(
                        count => count.repetitions === 3).value]
                     + " over "
                     + valueToName[sortedDistinctValues(winner.hand).find(
                        count => count.repetitions === 2).value];
            case 3:
                return winner.player
                     + " wins. - with flush: "
                     + valueToName[sortedDistinctValues(winner.hand)[0].value];
            case 4:
                return winner.player
                     + " wins. - with straight: "
                     + valueToName[sortedDistinctValues(winner.hand)[0].value];
            case 5:
                return winner.player
                     + " wins. - with three of a kind: "
                     + valueToName[sortedDistinctValues(winner.hand).find(
                        count => count.repetitions === 3).value];
            case 6:
                return winner.player
                     + " wins. - with two pairs: "
                     + valueToName[sortedDistinctValues(winner.hand).find(
                        count => count.repetitions === 2).value];
            case 7:
                return winner.player
                     + " wins. - with pair: "
                     + valueToName[sortedDistinctValues(winner.hand).find(
                        count => count.repetitions === 2).value];
            case 8:
                return undefined; // impossible
            default:
                return undefined;
        }
    }
    else {
        switch (firstRank) {
            case 0: // straight flush (both flags work)
                return untieByhighCard(firstPlayer, secondPlayer, false);
            case 1: // four of a kind
                return untieByhighCard(firstPlayer, secondPlayer, true);
            case 2: // full house
                return untieByhighCard(firstPlayer, secondPlayer, true);
            case 3: // flush
                return untieByhighCard(firstPlayer, secondPlayer, false);
            case 4: // straight (both flags work)
                return untieByhighCard(firstPlayer, secondPlayer, false);
            case 5: // three of a kind
                return untieByhighCard(firstPlayer, secondPlayer, true);
            case 6: // two pairs
                return untieByhighCard(firstPlayer, secondPlayer, true);
            case 7: // pair
                return untieByhighCard(firstPlayer, secondPlayer, true);
            case 8: // high card (both flags work)
                return untieByhighCard(firstPlayer, secondPlayer, false);
            default:
                return undefined;
        }
    }
}

function play(pairOfHands) {
    const game = readGame(pairOfHands);
    console.log(decideGame(game));
}

play("Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH");
play("Black: 2H 4S 4C 2D 4H  White: 2S 8S AS QS 3S");
play("Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C KH");
play("Black: 2H 3D 5S 9C KD  White: 2D 3H 5C 9S KH");

const functions = {
    // input parsing functions
    readValue,
    readSuit,
    readCard,
    readHand,
    readPlayer,
    readGame,
    // game logic functions
    isStraight,
    highCardRank,
    isFlush,
    isStraightFlush,
    isPair,
    isTwoPairs,
    isThreeOfAKind,
    isFullHouse,
    isFourOfAKind,
    decideGame,
};

export { functions };
