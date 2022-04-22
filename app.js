// BLACKJACK...end game
//HIDE/SHOW
//bank=0; refresh
//Resize for window browser
//Mobile Friendly


//(ACE VALUE......... )

//Insurance
    //if dealer has ace **SHOWING** (aka dealers second card) = insurance option show, buy insurance->
    // insurance cost half the bet, if dealer has an ace,
    //pay out 2:1
//surrender....button style
//Double Down 

//(ACE VALUE......... )

// Split
    // create //array
    // value = value
    // remove first firstChild
    // creaate a hidden div, 
    // otherhand . push (playerhand.pop())

const shuffleBtn = document.getElementById("shuffle")
const hitBtn = document.getElementById("hit")
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
let hasAce;

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
//Boolean to check ace.
    if (isNaN(value)) { 
        if(value == "A") {
            hasAce = true;
            console.log("HAS AN ACE")
        } 
    }

//Evaluates whether Ace is 1 or 11.
    let ds = dealerScore + 11;
    let ps = playerScore + 11;

    if (isNaN(value)) { 
        if (hasAce === true &&(ps<22)&&(ps>16)) { 
                    return 11;
        }
        if (hasAce === true &&(ds<22)&&(ds>16)) { 
            return 11;
        }
        return 1;
    }
    return parseInt(value);
}
    // if (hasAce === true){ 
    //     if ((ps<22)&&(ps>16)) { 
    //         return 11;
    //     }
    //     return 1;
    // }
    // if (hasAce === true) {
    //     if((ds<22)&&(ds>16)){ 
    //         return 11;
    //     }
    //     return 1; 
    // }

function checkBj(){
    if ((hasAce === true) && (playerScore === 21)){
        messageDisplay.textContent = "BLACKJACK"
    }
}

function startGame() {
//Deals a hidden card to the dealer.
    hidden = deck.pop();
    dealerScore += getValue(hidden);
    // dealerAceCount += checkAce(hidden);
    console.log("Dealer Hidden Card " + hidden + "  Dealer Score  " + dealerScore)  
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
//Deals two cards to the player. Appends card images to div, which appends to the player hand. 
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
    
        let div = document.createElement("div");
        cardImg.src = "./cards/" + card + ".png";
        div.append(cardImg)
        div.classList.add("pCards");
        // playerScore += getValue(card);
        // yourAceCount += checkAce(card);
        document.getElementById("player-hand").appendChild(div);
        console.log("Player Card Dealt  " + card)
        playerScore += getValue(card);
        console.log("Player Score Update  " + playerScore)
        playScoreDisplay.textContent = `PLAYER: ${playerScore}`
    }
    if ((hasAce === true) && (playerScore === 21)){
        messageDisplay.textContent = "PLAYER BLACKJACK! NICE!"
        }
       
}

//PLAYER HIT CARD.
function hit() {
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
        messageDisplay.textContent = "Oh No, Busted ㋛ You Lose.";
//If player busts, reveal dealer card and dealer score.
        document.getElementById("hidden").src = "./cards/" + hidden + ".png";
        dealerScoreDisplay.textContent = `DEALER: ${dealerScore}`
        bank -= bet;
        message = `You lost ${bet}.`
        console.log(`You busted. Lost ${bet}. Have $${bank} left.`)
        monies.textContent = `You have $${bank}`
        bet = 0;
        betTotal.textContent = `Bet ${bet}`

    }
    console.log("Player Hand Should Append, PlayerScore Update")
    console.log(playerScore);
    playScoreDisplay.textContent = `PLAYER: ${playerScore}`
    //hideBtn();
}
//Stand function, essentially evaluates score and ends game.
function stay() {
    hideBtn();
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";
    while (dealerScore < 17) {
        // for (let i = 0; i < 1; i++) {
            let cardImg = document.createElement("img");
            let card = deck.pop();
            cardImg.src = "./cards/" + card + ".png";
            dealerScore += getValue(card);
            console.log(card)
            console.log(dealerScore)
            dealerScoreDisplay.textContent = `DEALER: ${dealerScore}`
            document.getElementById("dealer-hand").append(cardImg);
        // }
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
        monies.textContent = `Bank: $${bank}`
        console.log(`You win ${bet}. Have $${bank}.`)
    
    }
    else if (playerScore == dealerScore) {
        message = "Tie!";
       
    }
    else if (playerScore > dealerScore) {
        message = `😃 You Win! YAY! 💰💰`;

        bank += bet;
        monies.textContent = `Bank: $${bank}`
        console.log(`You win ${bet}. Have $${bank}.`)
   
    }
    else if (playerScore < dealerScore) {
        message = "You Lose! ㋛";
        bank -= bet;
        monies.textContent = `Bank: $${bank}`
        console.log(`Lost ${bet}. Have $${bank} left.`)
        

        
    }
    playScoreDisplay.textContent = `PLAYER: ${playerScore}`
    dealerScoreDisplay.textContent = `DEALER: ${dealerScore}`
    messageDisplay.textContent = message;
    console.log(message)
    monies.textContent = `Bank: $${bank}`
    bet = 0;
    betTotal.textContent = `Bet: ${bet}`

    replaceBtn();
}

function addTen(){
    bet += 10;
    console.log("You added $10 to you bet.")
    console.log(bet)
    betTotal.textContent = `Bet: ${bet}`
}
function addTwenty(){
    bet += 20;
    console.log("You added $20 to you bet.")
    console.log(bet)
    betTotal.textContent = `Bet: ${bet}`
}
function addFifty(){
    bet += 50;
    console.log("You added $50 to you bet.")
    betTotal.textContent = `Bet: ${bet}`
}

monies.textContent = `Bank: $${bank}`
betTotal.textContent = `Bet: ${bet}`

function removeCard(){
    playScoreDisplay.textContent = " ";
    dealerScoreDisplay.textContent = " ";
    messageDisplay.textContent = "";
    replaceBtn();
    showBtn();

    while(playerHand.firstChild){
        playerHand.removeChild(playerHand.firstChild)
    }
    while(dealerHand.firstChild){
        dealerHand.removeChild(dealerHand.firstChild)
    }
}

function replaceBtn(){
    betTen.classList.toggle("show")
    betTwenty.classList.toggle("show")
    betFifty.classList.toggle("show")
}

function removeBet(){
    betTen.classList.toggle("hide")
   betTwenty.classList.toggle("hide")
   betFifty.classList.toggle("hide")

}
function hideBtn(){
    stayBtn.classList.toggle("hide")
    hitBtn.classList.toggle("hide")
}
function showBtn(){
    stayBtn.classList.toggle("show")
    hitBtn.classList.toggle("show")
}

function dealHands(){
    removeBet();
    removeCard();
    playerScore = 0;
    dealerScore = 0;
    // stayBtn.classList.add("hide")
    // hidden = deck.pop();
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
      
        let div = document.createElement("div");
        cardImg.src = "./cards/" + card + ".png";
        div.append(cardImg)
        div.classList.add("pCards");
        document.getElementById("player-hand").appendChild(div);
        console.log("Player Card Dealt  " + card)
        playerScore += getValue(card);
        console.log("Player Score Update  " + playerScore)
        playScoreDisplay.textContent = `PLAYER: ${playerScore}`
    }

    let hiddenDealerCard = document.createElement("img");
    hiddenDealerCard.id = "hidden"
    hiddenDealerCard.src = "./cards/BACK.png"
    dealerScore += getValue(hidden);
    dealerHand.appendChild(hiddenDealerCard);
    console.log("Dealer Card Dealt  " + hidden)

    for (let i = 0; i < 1; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerScore += getValue(card);
        console.log(card)
        console.log("d score " + dealerScore)
        document.getElementById("dealer-hand").append(cardImg);
    }

    if ((hasAce === true) && (playerScore === 21)){
        messageDisplay.textContent = "YOU WIN! YOU GOT BLACKJACK!!"
        console.log("BLACKJACK");
        bank += ((3/2)*bet);
        monies.textContent = `Bank: $${bank}`
        console.log(`WON ${bet}. NIOCE.`)
  
        }

    if ((hasAce === true) && (dealerScore === 21)){
   
        console.log("DEALER BLACKJACK");
        // bank -= bet;
        // monies.textContent = `You have $${bank}`
        // console.log(`Lost ${bet}. Have $${bank} left.`)
        }
    dealerScoreDisplay.textContent = ` DEALER: ?`

}

function surrender(){
    bet = bet/2;
    bank = bank - bet;
    monies.textContent = `Bank: $${bank}`
    removeCard();
    messageDisplay.textContent = "You surrendered. You got half your bet back."
}