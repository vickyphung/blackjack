let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let suits = ["diamonds", "hearts", "spades", "clubs"];
let deck = new Array();

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


function createDeck()
{
    deck = new Array();
    for (var i = 0 ; i < values.length; i++)
    {
        for(var x = 0; x < suits.length; x++)
        {
            var weight = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                weight = 10;
            if (values[i] == "A")
                weight = 11;
            var card = { Value: values[i], Suit: suits[x], Weight: weight };
            deck.push(card);
        }
    }
}

function createPlayerHand(num) {
    playHand = new Array ();
    for(let i = 1; i <= num; i++)
            {
                let hand = new Array();
                let player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: hand };
                playHand.push(player);
            }
        }


function createDealerHand(num)
{
    dealHand = new Array();
    for(var i = 1; i <= num; i++)
    {
        var hand = new Array();
        var dealer = { Name: 'dealer ' + i, ID: i, Points: 0, Hand: hand };
        dealHand.push(dealer);
    }
}

function createPlayersUI()
        {
            document.getElementById('player-hand').innerHTML = '';
            for(var i = 0; i < playHand.length; i++)
            {
                var div_player = document.createElement('div');
                var div_playerid = document.createElement('div');
                var div_hand = document.createElement('div');
                var div_points = document.createElement('div');

                div_points.className = 'points';
                div_points.id = 'points_' + i;
                div_player.id = 'player_' + i;
                div_player.className = 'player';
                div_hand.id = 'hand_' + i;

                div_playerid.innerHTML = 'Player ' + playHand[i].ID;
                div_player.appendChild(div_playerid);
                div_player.appendChild(div_hand);
                div_player.appendChild(div_points);
                document.getElementById('player-hand').appendChild(div_player);
            }
        }

        function createDealersUI()
        {
            document.getElementById('dealer-hand').innerHTML = '';
            for(var i = 0; i < dealHand.length; i++)
            {
                var div_player = document.createElement('div');
                var div_playerid = document.createElement('div');
                var div_hand = document.createElement('div');
                var div_points = document.createElement('div');

                div_points.className = 'points';
                div_points.id = 'points_' + i;
                div_player.id = 'player_' + i;
                div_player.className = 'player';
                div_hand.id = 'hand_' + i;

                div_playerid.innerHTML = 'Player ' + playHand[i].ID;
                div_player.appendChild(div_playerid);
                div_player.appendChild(div_hand);
                div_player.appendChild(div_points);
                document.getElementById('player-hand').appendChild(div_player);
            }
        }


        function shuffle()
        {
            // for 1000 turns
            // switch the values of two random cards
            for (var i = 0; i < 1000; i++)
            {
                var location1 = Math.floor((Math.random() * deck.length));
                var location2 = Math.floor((Math.random() * deck.length));
                var tmp = deck[location1];

                deck[location1] = deck[location2];
                deck[location2] = tmp;
            }
        }


        function startblackjack()
        {
            document.getElementById('dealCards').value = 'Restart';
            document.getElementById("message-box").style.display="none";
            // deal 2 cards to every player object
            playerScore = 0;
            createDeck();
            shuffle();
            createPlayers(2);
            createPlayersUI();
            dealHands();
            document.getElementById('player-score' + playerScore).classList.add('active');

            dealerScore = 0;
            document.getElementById('dealer-score' + dealerScore).classList.add('active');
        }



        function dealHands()
        {
            // alternate handing cards to each player
            // 2 cards each
            for(var i = 0; i < 2; i++)
            {
                for (var x = 0; x < players.length; x++)
                {
                    var card = deck.pop();
                    playHand[x].Hand.push(card);
                    renderCard(card, x);
                    updatePoints();

                    var card = deck.pop();
                    dealHand[x].Hand.push(card);
                    renderCard(card, x);
                    updatePoints();
                }
            }
            updateDeck();
        }

        function renderCard(card, player)
        {
            var hand = document.getElementById('hand_' + player);
            hand.appendChild(getCardUI(card));
        }




  function renderDCard(card, dealer)
        {
            var hand = document.getElementById('hand_' + dealer);
            hand.appendChild(getCardUI(card));
        }



        function getCardUI(card)
        {
            var el = document.createElement('div');
            var icon = '';
            if (card.Suit == 'Hearts')
            icon='&hearts;';
            else if (card.Suit == 'Spades')
            icon = '&spades;';
            else if (card.Suit == 'Diamonds')
            icon = '&diams;';
            else
            icon = '&clubs;';
            
            el.className = 'card';
            el.innerHTML = card.Value + '<br/>' + icon;
            return el;
        }


        function getPoints(player)
        {
            var points = 0;
            for(var i = 0; i < playHand[player].Hand.length; i++)
            {
                points += playHand[player].Hand[i].Weight;
            }
            playHand[player].Points = points;
            return points;
        }

        function getPoints(dealer)
        {
            var points = 0;
            for(var i = 0; i < dealHand[dealer].Hand.length; i++)
            {
                points += dealHand[dealer].Hand[i].Weight;
            }
            dealHand[player].Points = points;
            return points;
        }

        
        function updatePoints()
        {
            for (var i = 0 ; i < playHand.length; i++)
            {
                getPoints(i);
                document.getElementById('points_' + i).innerHTML = player-score[i].Points;
            }


            for (var i = 0 ; i < dealHand.length; i++)
            {
                getPoints(i);
                document.getElementById('points_' + i).innerHTML = dealer-score[i].Points;
            }
        }


        
        function hitMe()
        {
            // pop a card from the deck to the current player
            // check if current player new points are over 21
            var card = deck.pop();
            players[currentPlayer].Hand.push(card);
            renderCard(card, currentPlayer);
            updatePoints();
            updateDeck();
            check();
        }





        function stay()
        {
            // move on to next player, if any
            if (currentPlayer != playHand.length-1) {
                document.getElementById('player_' + player).classList.remove('active');
                currentPlayer += 1;
                document.getElementById('player_' + dealer).classList.add('active');
            }

            else {
                end();
            }
        }


        function end()
        {
            var winner = -1;
            var score = 0;

            for(var i = 0; i < playHand.length; i++)
            {
                if (playHand[i].Points > score && playHand[i].Points < 22)
                {
                    winner = i;
                }

                score = playHand[i].Points;
            }

            document.getElementById('message').innerHTML = 'Winner: Player ' + players[winner].ID;
            document.getElementById("message").style.display = "inline-block";
        }





        function check()
        {
            if (playHand[player].Points > 21)
            {
                document.getElementById('status').innerHTML = 'Player: ' + players[currentPlayer].ID + ' LOST';
                document.getElementById('status').style.display = "inline-block";
                end();
            }
        }

        function updateDeck()
        {
            document.getElementById('deckcount').innerHTML = deck.length;
        }

        window.addEventListener('load', function(){
            createDeck();
            shuffle();
            createPlayerHand(1);
            createDealerHand(1);
        });



















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

// console.log(cards[0])
// console.log(cards[1])
// console.log(cards[2])


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









// function load()
// {
// 	deck = getDeck();
// 	shuffle();
// 	renderDeck();
// }

// window.addEventListener('load', load);


// function dealCard(deck){
//     return deck.pop();
// }

// let card = dealCard(deck);
// console.log(card);

// console.log(cards[0])
// console.log(cards[1])
// console.log(cards[2])

// //END CARD STUFF

// const shuffleBtn = document.getElementById("shuffle")
// const hitBtn = document.getElementById("hitCard")
// const stayBtn = document.getElementById("stay")
// const dealBtn = document.getElementById("dealCards")


// const playerHand = document.getElementById("player-hand")
// const dealerHand = document.getElementById("dealer-hand")

// const playScoreDisplay = document.getElementById("player-score")
// const dealerScoreDisplay = document.getElementById("dealer-score")
// const messageDisplay = document.getElementById("message");


// let playerScore = 0;
// let dealerScore = 0;

// //Deal Cards

// //Function to Count Initial Hand Scores
// // function addToScore(score, player){
// //     let value;
// //     if(score === "JACK" || score === "QUEEN" || score === "KING"){
// //         value = 10
// //     } 
// //     else if (score === "ACE"){
// //         hasAce = true;
// //         value = 1;
// //         if (playerScore + 10 < 22){
// //             if(playerScore + 10 > 16){
// //                 if (score === "ACE"){
// //                 value = 11;            
// //                 }
// //             }                         
// //         }
// //         if (dealerScore + 10 < 22){
// //             if(dealerScore + 10 > 16){
// //                 if (score === "ACE"){
// //                 value = 11;            
// //                 }
// //             }         
// //         }
// //     }
// //     else {
// //         value = Number(score)
// //     }
// //     if(player === "player"){
// //         playerScore += value
// //         playerScoreDisplay.textContent = playerScore
// //     } else {
// //         dealerScore += value
// //         dealerScoreDisplay.textContent = dealerScore
// //     }
// //  }

// //Putting Hands and Scores on Page
// // let image = document.createElement("img")
// // image.src = cards[i].image
// // image.alt = cards[i].code

// // playerHand.appendChild(image)
// // document.getElementById("player-hand").appendChild(card)


// // addToScore(cards[i].value, "dealer")

// // dealerHand.appendChild(image)
// // addToScore(cards[i].value, "dealer")

// function dealHands()
// {
//     // alternate handing cards to each player
//     // 2 cards each
//     for(var i = 0; i < 2; i++)
//     {
//         for (var x = 0; x < players.length; x++)
//         {
//             var card = deck.pop();
//             players[x].Hand.push(card);
//             renderCard(card, x);
//             updatePoints();
//         }
//     }

//     updateDeck();
// }


// // document.getElementById("player-hand").appendChild(card)


// // document.getElementById("dealer-hand").appendChild(card)


// // document.getElementById("player-hand").appendChild(card)
// // playerScoreDisplay.textContent = playerScore

// // //HIDDEN
// // document.getElementById("dealer-hand").appendChild(card)
// // dealerScoreDisplay.textContent = dealerScore





// function createPlayers(num)
// {
//     players = new Array();
//     for(var i = 1; i <= num; i++)
//     {
//         var hand = new Array();
//         var player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: hand };
//         players.push(player);
//     }
// }

// function createPlayersUI()
// {
//     document.getElementById('players').innerHTML = '';
//     for(var i = 0; i < players.length; i++)
//     {
//         var div_player = document.createElement('div');
//         var div_playerid = document.createElement('div');
//         var div_hand = document.createElement('div');
//         var div_points = document.createElement('div');

//         div_points.className = 'points';
//         div_points.id = 'points_' + i;
//         div_player.id = 'player_' + i;
//         div_player.className = 'player';
//         div_hand.id = 'hand_' + i;

//         div_playerid.innerHTML = players[i].ID;
//         div_player.appendChild(div_playerid);
//         div_player.appendChild(div_hand);
//         div_player.appendChild(div_points);
//         document.getElementById('players').appendChild(div_player);
//     }
// }
// function startblackjack()
// {
//     document.getElementById('btnStart').value = 'Restart';
//     document.getElementById("status").style.display="none";
//     // deal 2 cards to every player object
//     currentPlayer = 0;
//     createDeck();
//     shuffle();
//     createPlayers(2);
//     createPlayersUI();
//     dealHands();
//     document.getElementById('player_' + currentPlayer).classList.add('active');
// }    function dealHands()
// {
//     // alternate handing cards to each player
//     // 2 cards each
//     for(var i = 0; i < 2; i++)
//     {
//         for (var x = 0; x < players.length; x++)
//         {
//             var card = deck.pop();
//             players[x].Hand.push(card);
//             renderCard(card, x);
//             updatePoints();
//         }
//     }

//     updateDeck();
// }

// function dealHands()
// {
//     // alternate handing cards to each player
//     // 2 cards each
//     for(var i = 0; i < 2; i++)
//     {
//         for (var x = 0; x < players.length; x++)
//         {
//             var card = deck.pop();
//             players[x].Hand.push(card);
//             renderCard(card, x);
//             updatePoints();
//         }
//     }

//     updateDeck();
// }

// function renderCard(card, player)
// {
//     var hand = document.getElementById('hand_' + player);
//     hand.appendChild(getCardUI(card));
// }

// function getCardUI(card)
// {
//     var el = document.createElement('div');
//     el.className = 'card';
//     el.innerHTML = card.Suit + ' ' + card.Value;
//     return el;
// }

// var currentPlayer = 0;
// function hitMe()
// {
//     // pop a card from the deck to the current player
//     // check if current player new points are over 21
//     var card = deck.pop();
//     players[currentPlayer].Hand.push(card);
//     renderCard(card, currentPlayer);
//     updatePoints();
//     check();
// }

// function check()
// {
//     if (players[currentPlayer].Points > 21)
//     {
//         document.getElementById('status').innerHTML = 'Player: ' + players[currentPlayer].ID + ' LOST';
//     }
// }

// var currentPlayer = 0;
// function hitMe()
// {
//     // pop a card from the deck to the current player
//     // check if current player new points are over 21
//     var card = deck.pop();
//     players[currentPlayer].Hand.push(card);
//     renderCard(card, currentPlayer);
//     updatePoints();
//     check();
// }

// function check()
// {
//     if (players[currentPlayer].Points > 21)
//     {
//         document.getElementById('status').innerHTML = 'Player: ' + players[currentPlayer].ID + ' LOST';
//     }
// }

// function stay()
// {
//     // move on to next player, if any
//     if (currentPlayer != players.length-1) {
//         document.getElementById('player_' + currentPlayer).classList.remove('active');
//         currentPlayer += 1;
//         document.getElementById('player_' + currentPlayer).classList.add('active');
//     }

//     else {
//         end();
//     }
// }

// function end()
// {
//     var winner = -1;
//     var score = 0;

//     for(var i = 0; i < players.length; i++)
//     {
//         if (players[i].Points > score && players[i].Points < 22)
//         {
//             winner = i;
//         }

//         score = players[i].Points;
//     }

//     document.getElementById('status').innerHTML = 'Winner: Player ' + players[winner].ID;
// }