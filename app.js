    
const shuffleBtn = document.getElementById("shuffle")
const playBtn = document.getElementById("play")
const hitBtn = document.getElementById("draw-card")
const stayBtn = document.getElementById("stay")
const newBtn = document.getElementById("new-game")

const playerHand = document.getElementById("player-hand")
const dealerHand = document.getElementById("dealer-hand")

const playerDisplay = document.getElementById("player-display")
const dealerDisplay = document.getElementById("dealer-display")
const winnerDisplay = document.getElementById("winner");

let deckId;
let playerScore = 0;
let dealerScore = 0;


shuffle()

function newGame(){
    while(playerHand.firstChild){
        playerHand.removeChild(playerHand.firstChild)
    }
    while(dealerHand.firstChild){
        dealerHand.removeChild(dealerHand.firstChild)
    }
    dealerScore = 0
    playerScore = 0
    winnerDisplay.textContent = ""
    shuffle()
    play()
}
function shuffle(){
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(response => response.json())
    .then(data => {
        deckId= data.deck_id
        shuffleBtn.classList.toggle("hidden")
        // playBtn.classList.toggle("hidden")
    })
    .catch(err => console.log(err))
}

function dealerDraw(){
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(response => response.json())
    .then(data => {
        let card = data.cards[0]
        let image = document.createElement("img")
        image.src = card.image
        image.alt = card.code
        dealerHand.appendChild(image)
        addToScore(card.value, "dealer")
        evaluateWinner()
    })
    .catch(err => console.log(err))
}

function play(){
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
    .then(response => response.json())
    .then(data => {
        let cards = data.cards
        for(let i = 0; i < cards.length; i++){
            console.log(cards[i])
            let image = document.createElement("img")
            image.src = cards[i].image
            image.alt = cards[i].code
            if(i < 2){
                playerHand.appendChild(image)
                addToScore(cards[i].value, "player")
            }
            else {
                dealerHand.appendChild(image)
                addToScore(cards[i].value, "dealer")
            }   
        }
            // playBtn.classList.toggle("hidden")
            hitBtn.classList.toggle("hidden")
            stayBtn.classList.toggle("hidden")
    })
    .catch(err => console.log(err))
}



function checkBlackjack(){
    let winner;
    if(playerScore === dealerScore){
        winner = "NO ONE"
    } else if(playerScore === 21) {
        winner = "PLAYER"
    } else if(dealerScore === 21){
        winner = "DEALER"
    }
    displayWinner(winner);
    }


function addToScore(score, player){
    let value;
    if(score === "JACK" || score === "QUEEN" || score === "KING"){
        value = 10
    }
   
    
    
    else if (score === "ACE"){
        value = 1;
        hasAce = true;

        if (dealerScore + 10 < 22){
             if(dealerScore + 10 > 16){
                if (score === "ACE"){
                value = 11;            
                }
             }
        }
    }


    else {
        value = Number(score)
    }
    if(player === "player"){
        playerScore += value
        playerDisplay.textContent = playerScore
    } else {
        dealerScore += value
        dealerDisplay.textContent = dealerScore
    }
 }

//CHECK FOR BJ....................
//  if ( (hasAce = true) {
//     if (dealerScore === 21){
//     displayWinner("DEALER BLACKJACK") 
//     } 
//     else if (playerScore === 21){
//     displayWinner("PLAYER BLACKJACK")
//     }


 function evaluateWinner(){
    if(dealerScore < 17){
        dealerDraw()
    }
    else {
        let winner;
        if(playerScore === dealerScore){
            winner = "NO ONE"
        } else if(playerScore === 21 || dealerScore > 21 ||playerScore > dealerScore){
            winner = "PLAYER"
        } else {
            winner = "DEALER"
        }
        displayWinner(winner)
    }   
}

function checkTotal(){
    if(playerScore > 21){
        displayWinner("DEALER")
    }
}

function displayWinner(winner){
    winnerDisplay.textContent = `${winner} WINS!`
    dealerDisplay.textContent = dealerScore
    hitBtn.classList.toggle("hidden")
    stayBtn.classList.toggle("hidden")
    newBtn.classList.toggle("hidden")
}

function drawCard(){
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(response => response.json())
    .then(data => {
        let card = data.cards[0]
        let image = document.createElement("img")
        image.src = card.image
        image.alt = card.code
        playerHand.appendChild(image)
        addToScore(card.value, "player")
        checkTotal()
    })
    .catch(err => console.log(err))
}




//FUCKING ACES and BLACKJACK

//Have an ACE? Check for Blackjack.
// if(hasAce = true){
// //     checkBlackjack();
// // }


//     let blackjack;
//     if(value === "JACK" || value === "QUEEN" || value === "KING" || value === 10){
//         if(value === "ACE"){
//         console.log("BLACKJACK BITCH")
//         }
//     }
// }
// function checkBlackjack(){
// let winner;
// if(playerScore === dealerScore){
//     winner = "NO ONE"
// } else if(playerScore === 21) {
//     winner = "PLAYER"
// } else if(dealerScore === 21){
//     winner = "DEALER"
// }
// displayWinner(winner);
// }



// //Got player to register Ace as 11 instead of 1. Need better rules..
// if(hasAce = true){
//     if (playerScore + 10 <= 21){
//         if (score === "ACE"){
//             value = 11;
//         }
//     }
// }



