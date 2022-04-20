



const shuffleBtn = document.getElementById("shuffle")
const hitBtn = document.getElementById("hitCard")
const stayBtn = document.getElementById("stay")
const dealBtn = document.getElementById("dealCards")


const playerHand = document.getElementById("player-hand")
const dealerHand = document.getElementById("dealer-hand")

const playScoreDisplay = document.getElementById("player-score")
const dealerScoreDisplay = document.getElementById("dealer-score")
const messageDisplay = document.getElementById("msgbox");


let playerScore = 0;
let dealerScore = 0;



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





function getValue(card) {
    let data = card.split("-"); 
    let value = data[0];

//Assigns face cards at value 10.
    if (isNaN(value)) { 
        if(value == "J" || value == "Q" || value === "K"){
        return 10;
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
// while (dealerScore < 17) {
      for (let i = 0; i < 1; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerScore += getValue(card);
        // dealerAceCount += checkAce(card);
        document.getElementById("dealer-hand").append(cardImg);
}
        console.log(dealerScore);
    // }

    dealerScoreDisplay.textContent = ` DEALER ?`

//Deals 2 cards to the player.
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerScore += getValue(card);
        // yourAceCount += checkAce(card);
        document.getElementById("player-hand").append(cardImg);

        console.log("Player Cards")
        console.log(card)
    }

    console.log("Player Hand Should Append, PlayerScore Update")
    console.log(playerScore);
    playScoreDisplay.textContent = `PLAYER ${playerScore}`


    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);

}






function hit() {
    // if (!drawCard) {
    //     return;
    // }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    
    playerScore+= getValue(card);

    document.getElementById("player-hand").append(cardImg);
    

    // if (playerScore >21){
    //     drawCard = false;
    // }
    
    
    console.log("Player got a hit card, Score update")
    console.log(playerScore)
    playScoreDisplay.textContent = `PLAYER ${playerScore}`
}


function stay() {


    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";
    if (playerScore > 21) {
        message = "Busted! :(";
    }
    else if (dealerScore > 21) {
        message = " Dealer Busts. You win! :D";
    }
    //both you and dealer <= 21
    else if (playerScore == dealerScore) {
        message = "Tie!";
    }
    else if (playerScore > dealerScore) {
        message = "You Win! YAY!";
    }
    else if (playerScore < dealerScore) {
        message = "You Lose! :(";
    }


    // document.getElementById("dealer-sum").innerText = dealerSum;
    // document.getElementById("your-sum").innerText = yourSum;
    // document.getElementById("msgbox").innerText = message;

    playScoreDisplay.textContent = `PLAYER ${playerScore}`
    dealerScoreDisplay.textContent = `DEALER ${dealerScore}`
    messageDisplay.textContent = message;

    console.log(message)


    while (dealerScore < 17) {
        //   for (let i = 0; i < 1; i++) {
            let cardImg = document.createElement("img");
            let card = deck.pop();
            cardImg.src = "./cards/" + card + ".png";
            dealerScore += getValue(card);
            // dealerAceCount += checkAce(card);
            document.getElementById("dealer-hand").append(cardImg);
    }


}








// function checkAce(card) {
//     if (card[0] == "A") {
//         return 1;
//     }
//     return 0;
// }

// function reduceAce(playerScore, playerAceCount) {
//     while (playerScore > 21 && playerAceCount > 0) {
//         playerScore -= 10;
//         playerAceCount -= 1;
//     }
//     return playerScore;
