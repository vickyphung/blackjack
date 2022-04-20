



const shuffleBtn = document.getElementById("shuffle")
const hitBtn = document.getElementById("hitCard")
const stayBtn = document.getElementById("stay")
const dealBtn = document.getElementById("dealCards")


const playerHand = document.getElementById("player-hand")
const dealerHand = document.getElementById("dealer-hand")

const playScoreDisplay = document.getElementById("player-score")
const dealerScoreDisplay = document.getElementById("dealer-score")
const messageDisplay = document.getElementById("message");


let playerScore = 0;
let dealerScore = 0;

let playhand = new Array();
let dealhand = new Array();

let hidden;
let deck;


window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let suits = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + suits[i]); 
        }
    }

    console.log("created deck");
    console.log(deck);
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
    console.log("shuffled deck");
}


//DEAL CARDS
//DEAL CARDS TO DEALER
function startGame() {
      for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();

        
        cardImg.src = "./cards/" + card + ".png";
        dealerScore += getValue(card);
        // yourAceCount += checkAce(card);
        document.getElementById("dealer-hand").append(cardImg);
    }


    console.log("Dealers hidden Card and Dealer Score");
    console.log(hidden);
    console.log(dealerScore);
    dealerScoreDisplay.textContent = ` DEALER ${dealerScore}`

    
    // hidden = deck.pop();
    // dealerSum += getValue(hidden);
    // dealerAceCount += checkAce(hidden);
    // // console.log(hidden);
    // // console.log(dealerSum);
    // while (dealerSum < 17) {
    //     //<img src="./cards/4-C.png">
    //     let cardImg = document.createElement("img");
    //     let card = deck.pop();
    //     cardImg.src = "./cards/" + card + ".png";
    //     dealerSum += getValue(card);
    //     dealerAceCount += checkAce(card);
    //     document.getElementById("dealer-cards").append(cardImg);
    // }
    // console.log(dealerSum);

    
    //PLAYER START CARDS
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();

        cardImg.src = "./cards/" + card + ".png";
        playerScore += getValue(card);
        // yourAceCount += checkAce(card);
        document.getElementById("player-hand").append(cardImg);
    }

    console.log("Player Hand Should Append, PlayerScore Update")
    console.log(playerScore);
    playScoreDisplay.textContent = `PLAYER ${playerScore}`


    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);

}



function getValue(card) {
    let data = card.split("-"); // "4-C" -> ["4", "C"]
    let value = data[0];

    if (isNaN(value)) { //A J Q K
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}




// function renderDeck()
// {
// 	document.getElementById('deck').innerHTML = '';

// 	for(let i = 0; i < deck.length; i++)
// 	{
// 		let card = document.createElement("div");
// 		let icon = '';
// 		if (deck[i].Suit == 'hearts')
// 		icon='&hearts;';
// 		else if (deck[i].Suit == 'spades')
// 		icon = '&spades;';
// 		else if (deck[i].Suit == 'diamonds')
// 		icon = '&diams;';
// 		else
// 		icon = '&clubs;';

// 		card.innerHTML = deck[i].Value + '' + icon;
// 		card.classList.add('card');
// 		card.classList.add(deck[i].Suit);
// 		document.getElementById("deck").appendChild(card);
// 	}
// }



// function getDeck() {
// 	let deck = new Array();

// 	for(let i = 0; i < suits.length; i++) {
// 		for(let x = 0; x < cards.length; x++) {
// 			let card = {Value: cards[x], Suit: suits[i]};
// 			deck.push(card);
// 		}
// 	}
// 	return deck;
// }

// function shuffle(){
// 	for (let i = 0; i < 1000; i++)
// 	{
// 		let location1 = Math.floor((Math.random() * deck.length));
// 		let location2 = Math.floor((Math.random() * deck.length));
// 		let tmp = deck[location1];

// 		deck[location1] = deck[location2];
// 		deck[location2] = tmp;
// 	}

// 	renderDeck();
// }









