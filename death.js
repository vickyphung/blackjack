
// BLACKJACK? end Game
// Deal new cards: keep bank score || Clear out old cards and reset score.

//toggle, display none, class hide
// Surrender
// Insurance

// Double Down

// Split

const shuffleBtn = document.getElementById("shuffle")
const hitBtn = document.getElementById("hitCard")
const stayBtn = document.getElementById("stay")
const dealBtn = document.getElementById("dealCards")
const playerHand = document.getElementById("player-hand")
const dealerHand = document.getElementById("dealer-hand")
const playScoreDisplay = document.getElementById("player-score")
const dealerScoreDisplay = document.getElementById("dealer-score")
const messageDisplay = document.getElementById("msgbox");
const betTen = document.getElementById("ten")
const betTwenty = document.getElementById("twenty")
const betFifty = document.getElementById("fifty")
const monies = document.getElementById("bank-roll")
const betTotal = document.getElementById("totalBet")

let playerScore = 0;
let dealerScore = 0;
let bet = 0;
let bank = 1000;

let hidden;
let deck;
let drawCard = true;

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
    console.log("shuffled deck");
    console.log(deck);
}

function getValue(card) {
    let data = card.split("-"); 
    let value = data[0];

//Assigns face cards at value 10.
    if (isNaN(value)) { 
        if(value == "J" || value == "Q" || value === "K"){
        return 10;
        }
    } 

    if (isNaN(value)) { 
        if(value == "A") {
            hasAce = true;
            console.log("HAS AN ACE")
        } 
    }

//Evaluates whether Ace is 1 or 11
    let ds = dealerScore + 11;
    let ps = playerScore + 11;

    if (isNaN(value)) { 
        if (value == "A"&&(ps<22)&&(ps>16)) { 
                    return 11;
        }
        if (value == "A"&&(ds<22)&&(ds>16)) { 
            return 11;
        }
        return 1; 
    }
    return parseInt(value);

}


//CLEAR OUT CARDS.....

function removeCard(){
while(playerHand.firstChild){
    playerHand.removeChild(playerHand.firstChild)
    }

while(dealerHand.firstChild){
      dealerHand.removeChild(dealerHand.firstChild)
      }

}
//DEAL CARDS
function startGame() {


//Deals a hidden card to the dealer.
    hidden = deck.pop();
    dealerScore += getValue(hidden);
    // dealerAceCount += checkAce(hidden);

    console.log("Checking Dealer Hidden Card and Dealer Score")
    console.log(hidden);
    console.log(dealerScore);
  
//Deals a second card to the dealer hand.
      for (let i = 0; i < 1; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerScore += getValue(card);
        // dealerAceCount += checkAce(card);
        document.getElementById("dealer-hand").append(cardImg);
}
        console.log(dealerScore);
        dealerScoreDisplay.textContent = ` DEALER: ?`

//Deals 2 cards to the player.
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        
        cardImg.src = "./cards/" + card + ".png";
        playerScore += getValue(card);
        // yourAceCount += checkAce(card);
        document.getElementById("player-hand").append(cardImg);
    
        console.log("Player Cards Delt in Loop (x2)")
        console.log(card)
    }
    console.log("Player Hand Should Append, PlayerScore Update")
    console.log(playerScore);
    playScoreDisplay.textContent = `PLAYER: ${playerScore}`
}

//PLAYER HIT CARD.
function hit() {
    if (!drawCard) {
        return;
    }
    for (let i = 0; i < 1; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerScore += getValue(card);
        // yourAceCount += checkAce(card);
        document.getElementById("player-hand").append(cardImg);
    
        console.log("Player Cards")
        console.log(card)
    }
//If Player goes over 21 while hitting.
    if (playerScore > 21) {
        drawCard = false;
        messageDisplay.textContent = "Oh No, Busted ㋛ You Lose.";
//If player busts, reveal dealer card and dealer score.
        document.getElementById("hidden").src = "./cards/" + hidden + ".png";
        dealerScoreDisplay.textContent = `DEALER: ${dealerScore}`

        bank -= bet;
        message = `You lost ${bet}.`
        console.log(`You busted. Lost ${bet}. Have $${bank} left.`)

        monies.textContent = `You have $${bank}`
        bet = 0;

        betTotal.textContent = `Your current bet is ${bet}`


    }

    console.log("Player Hand Should Append, PlayerScore Update")
    console.log(playerScore);
    playScoreDisplay.textContent = `PLAYER: ${playerScore}`
}

//Stand function, essentially evaluates score and ends game.
function stay() {
    drawCard = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    while (dealerScore < 17) {
        //   for (let i = 0; i < 1; i++) {
            let cardImg = document.createElement("img");
            let card = deck.pop();
            cardImg.src = "./cards/" + card + ".png";
            dealerScore += getValue(card);
            // dealerAceCount += checkAce(card);
            document.getElementById("dealer-hand").append(cardImg);
    }

    let message = "";
    if (playerScore > 21) {
        message = "Busted! :(";
        bank -= bet;
        message = `You lost ㋛.`
        console.log(`You busted. Lost ${bet}. Have $${bank} left.`)

    }
    if (dealerScore > 21) {
 
        message = `😃 Dealer Busts. You Win! YAY! 💰💰`;

        bank += bet;
        monies.textContent = `You have $${bank}`
        console.log(`You win ${bet}. Have $${bank}.`)

    }
    else if (playerScore == dealerScore) {
        message = "Tie!";
    }
    else if (playerScore > dealerScore) {
        message = `😃 You Win! YAY! 💰💰`;

        bank += bet;
        monies.textContent = `You have $${bank}`
        console.log(`You win ${bet}. Have $${bank}.`)

    }
    else if (playerScore < dealerScore) {
        message = "You Lose! ㋛";

        bank -= bet;
        monies.textContent = `You have $${bank}`
        console.log(`Lost ${bet}. Have $${bank} left.`)
    }

    playScoreDisplay.textContent = `PLAYER: ${playerScore}`
    dealerScoreDisplay.textContent = `DEALER: ${dealerScore}`
    messageDisplay.textContent = message;
    console.log(message)

    monies.textContent = `You have $${bank}`
    bet = 0;
    betTotal.textContent = `Your current bet is ${bet}`
}

function addTen(){
    bet += 10;
    console.log("You added $10 to you bet.")
    console.log(bet)
    betTotal.textContent = `Your current bet is ${bet}`
}
function addTwenty(){
    bet += 20;
    console.log("You added $20 to you bet.")
    console.log(bet)
    betTotal.textContent = `Your current bet is ${bet}`
}
function addFifty(){
    bet += 50;
    console.log("You added $50 to you bet.")
    betTotal.textContent = `Your current bet is ${bet}`
}

monies.textContent = `You have $${bank}`
betTotal.textContent = `Your current bet is ${bet}`





// function checkAce(card) {
//  if (has Ace = true) {

//  }

// if (card[0] == "A") {

// }

// }


