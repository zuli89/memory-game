/*
 * Create a list that holds all of your cards
 */

let card = $(".card");
let cardList = [...card];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//shuffle cards and add shuffled cards to deck//

function shuffledDeck() {
    shuffle(cardList); 
    for (i = 0; i <= cardList.length; i++) {
        newcard = cardList[i];
    $('.deck').append(newcard);
    }
}

shuffledDeck(); 


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 let openCards = [];
 let matchedCards = [];


$(document).on('click', '.card:not(.unclickable)', (function() {
    $(this).addClass('show open unclickable animated flipInY'); //flips card when clicked, avoids being able to double click
    openCards.push(this); //add card to openCards array
    if (openCards.length == 2) {
        matching(); //run function to match cards
        moveCount(); //call function to count a move after two cards are selected
        }
    }
));

function matching() {
    if (openCards[0].children[0].className === openCards[1].children[0].className) {
        $(openCards[0]).removeClass('show open flipInY').addClass('match animated pulse');
        $(openCards[1]).removeClass('show open flipInY').addClass('match animated pulse');
        matchedCards.push(openCards[0], openCards[1]); //add matched cards to an array
        openCards = [];
        //$(matchedCards).off('click'); //remove matched card from game so they cannot be clicked
    } else noMatch();
}

function noMatch() {
    card.addClass('unclickable'); //add class to temprarily disable event listeners on clicks
    setTimeout(function(){
        $(openCards).removeClass('show open flipInY');
        card.removeClass('unclickable'); //remove class to enable event listeners on c licks
        openCards = [];
    }, 1300);  
    
}

//move counter*/

let moveNumber = 0;

function moveCount(){
    moveNumber++;
    $('.moves').html(moveNumber);
    //star rating
    if (moveNumber > 8 && moveNumber < 12) {
        $('.stars li:eq(1)').hide(); 
    } else if (moveNumber >= 16) {
        $('.stars li:eq(2)').hide(); 
    }
}

//timer

function timer(){
    card.on('click', (function(){ //trigers timer on
        let startTime = new Date;
        counter = setInterval(function() {
            $('.timer').html(function(){
                count = (new Date - startTime)/1000; //compute time elapsed
                secs = String(Math.round(count) % 60); //round time and restart when one minute has elapsed
                mins = String(Math.floor(count / 60)); // compute minutes based on seconds elapsed
                M = mins.length < 2 ? '0' + mins : mins; 
                S = secs.length < 2 ? '0' + secs : secs;   
                return (M + ":" + S);
            }
        );}, 1000);
        card.off('click'); //removes event listener so time doesn't restart every time a card is clicked
        }
    ));
}

timer();

//reset game
$('.restart').click(restartGame);


function restartGame(){
//flip cards
    card.removeClass('match open show pulse');
    matchedCards =[];
    openCards =[];
//shuffle
    shuffledDeck();
//reset timer
    $('.timer').html("00:00");
    clearInterval(counter);
    timer();
    //reset moves
    moveNumber = 0;
    $('.moves').html(moveNumber);
    //reset stars
    $('.stars li').show();

}

//Pop-up - modal

