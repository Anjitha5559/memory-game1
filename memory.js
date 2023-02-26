const gameBody = document.getElementById('gameBody');
const score = document.getElementById('score');
const moves = document.getElementById('moves');
const start = document.getElementById('start');
let firstCard = null;//initiating the firstCard variable and setting it to null
let secondCard = null;//initiating the secondCard variable and setting it to null
score.innerHTML = 0;//setting the score to 0
moves.innerHTML = 0;//setting the moves to 0
let size = 2;//setting the size of the game to 2, this will be the level when the game starts
start.addEventListener('click', startGame(size));//adding an event listener to the start button, when clicked it will call the startGame function

function startGame(size) {//This function contains all other functions
    var realArray = makeRandArray(size);
    formMatrix(realArray, size);
    flipcard(size);
}
function makeRandArray(size) {//This function will make an array of random numbers
    size = (size * size) / 2;//If the size is 2, then the size of the array will be 4 because we need 2 of each number similarly if it is 4 then the size of array will be 16
    console.log(size);
    let tempArray = [];//initiating the tempArray variable and setting it to an empty array, this array stores the random numbers
    for (let i = 0; i < size; i++) {
        let randomNumber = Math.floor(Math.random() * 20);//generating a random number between 0 and 20,generally math.random produce random numbers between 0 and 1, so we multiply it by 20 to get a number between 0 and 20
        if (tempArray.includes(randomNumber)) {//If the random number is already present in the array, then we will not push it to the array
            i--;
            continue;//we will continue the loop
        }
        tempArray.push(randomNumber);//if the random number is not present in the array, then we will push it to the array
    }
    let realArray = [...tempArray, ...tempArray];//we will make a new array by combining the tempArray twice, this is done because we need 2 of each number
    console.log(realArray);
    realArray.sort(() => Math.random() - 0.5);//This will shuffle the array
    console.log(realArray);
    return realArray;//realArray will be returned which is the result of the function
}
function formMatrix(realArray, size) {//This function will form the matrix, it will take the realArray and the size as the parameters
    gameBody.innerHTML = "";//setting the innerHTML of the gameBody to an empty string
    for (let i = 0; i < size * size; i++) {//we will run a loop for the size of the array
        gameBody.innerHTML += //This will make dynamic HTML elements and add them to the gameBody,cardFront comprises the front of the card which is a question mark and cardBack comprises the back of the card which is the number from the realArray
            `
        <div class="slots">  
        <div class="cardFront">
?  </div>
  <div class="cardBack">
        ${realArray[i]}
        </div>
    </div>`
    }
}
function flipcard(size) {//This function will flip the card and check if the cards match
    let card = document.querySelectorAll('.slots');//This will select all the elements with the class slots
    console.log(card);
    console.log("hwy there");
    let firstCard = null;//setting the firstCard variable to null
    let firstCardValue = null;//setting the firstCardValue variable to null, bw firstCardValue stores the value of the first card
    let secondCard = null;//setting the secondCard variable to null
    console.log(size);
    card.forEach(card => {//we will run a loop for the size of the array
        card.addEventListener('click', function () {//we will add an event listener to each card, when clicked it will call the function
            card.classList.toggle('flipped');//this will add the class flipped to the card, this will help to manipulate the flipped card
            if (firstCard == null) {//if the firstCard is null, then we will set the firstCard to the card that was clicked
                firstCard = card;
                firstCardValue = firstCard.children[1].innerHTML;//we will set the firstCardValue to the value of the card that was clicked
                console.log(firstCard);
                console.log(firstCardValue)
            } else {
                secondCard = card;//if the firstCard is not null, then we will set the secondCard to the card that was clicked
                console.log(secondCard);
                var secondCardValue = secondCard.children[1].innerHTML;//we will set the secondCardValue to the value of the card that was clicked
                console.log(secondCardValue);
                if (firstCardValue == secondCardValue) {//if the firstCardValue and the secondCardValue are equal, then we will increment the score by 1
                    console.log("match");
                    var newScore = parseInt(score.innerHTML);//parseInt will convert the string to an integer, since we can only increment an integer
                    score.innerHTML = + newScore + 1;//we will increment the score by 1
                    firstCard.style.pointerEvents = "none";//we will set the pointerEvents of the firstCard to none, this will prevent the user from clicking the card again
                    secondCard.style.pointerEvents = "none";//we will set the pointerEvents of the secondCard to none, this will prevent the user from clicking the card again
                    console.log(score.innerHTML);
                    console.log(newScore);
                    firstCard = null;//we will set the firstCard to null
                    secondCard = null;//we will set the secondCard to null
                    console.log(size);
                    console.log(size * size / 2);
                    console.log(score.innerHTML);
                    if (score.innerHTML == size * size / 2) {//if the score is equal to the size of the array divided by 2, then the user has won the game
                        gameBody.innerHTML = `<div id="win">You Win</div>//This will display the win message
                        <div id="win">Your Score is:${score.innerHTML}</div>
                        <div id="win">Your Moves are:${moves.innerHTML}</div>
                        <div id="win">Your Accuracy is:${score.innerHTML / moves.innerHTML * 100}%</div>
                        <div id="next"><button id="nextLevel">NEXT LEVEL</button></div>`;//
                        nextLevel.addEventListener('click', function () {//we will add an event listener to the nextLevel button, when clicked it will take the user to the next level
                            size = size + 2;//we will increment the size by 2 as only even numbners are allowed
                            score.innerHTML = 0;//we will set the score to 0
                            moves.innerHTML = 0;//we will set the moves to 0
                            console.log(size);
                            startGame(size);//we will call the startGame function and pass the size as the parameter
                        })

                    }

                } else {//if the firstCardValue and the secondCardValue are not equal, then we will increment the moves by 1
                    var newMoves = parseInt(moves.innerHTML);//parseInt will convert the string to an integer, since we can only increment an integer
                    moves.innerHTML = + newMoves + 1;
                    console.log(moves.innerHTML);
                    console.log(newMoves);
                    setTimeout(() => {//we will set a timeout of 700ms, this will give the user some time to see the second card
                        console.log("no match");
                        firstCard.classList.remove('flipped');//we will remove the class flipped from the firstCard
                        secondCard.classList.remove('flipped');//we will remove the class flipped from the secondCard
                        firstCard = null;//we will set the firstCard to null
                        secondCard = null;//we will set the secondCard to null
                    }, 700)
                }
            }
        });
    });
}



