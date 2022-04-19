

PLAYER, ACES.

EVAL BLACKJACK AFTER hasACE...............


MONIES.

Split
Double

Styling.


PLAYER_ DONT WANT TO HAVE TO HIT STAY AFTER GETTING 21.




function show( object, vis )
{
	var	obj;
	obj = getStyleItem( object );
	obj.visibility = vis;
}


giveCard( PLAYER );
giveCard( DEALER );
giveCard( PLAYER );
giveCard( DEALER );
dealer21 = ((cardValue[1] + cardValue[3]) == 21);
player21 = ((cardValue[0] + cardValue[2]) == 21);



    if (dealer21)
    {
        /* turn over the down card */
        showCard( DEALER, 1, true );
        if (player21)
        {
            msg = "We both had blackjack. That's a tie.";
        }
        else
        {
            msg = "Sorry, dealer had blackjack.";
            money -= bet;
        }
    }
    else if (player21)
    {
        msg = "Blackjack! You win $" + formatMoney(bet * 3 / 2 ) + ".";
        money += bet * 3/2;
    }
	}
	updateDealerInfo();
	return msg;

    if (yourSum > 21) {
        message = "You Lose!";
    }
    else if (dealerSum > 21) {
        message = "You win!";
    }
    //both you and dealer <= 21
    else if (yourSum == dealerSum) {
        message = "Tie!";
    }
    else if (yourSum > dealerSum) {
        message = "You Win!";
    }
    else if (yourSum < dealerSum) {
        message = "You Lose!";
    }
