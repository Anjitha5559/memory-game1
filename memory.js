const gameBody = document.getElementById('gameBody');
const score = document.getElementById('score');
const moves = document.getElementById('moves');
const start = document.getElementById('start');
let level = 2;
let size = 0;

start.addEventListener('click', function () {
    startGame();
})
function setSlotWidth(){
    let width = 70/level;
    console.log(width);
    document.documentElement.style.setProperty('--slotwidth', width + 'vh');
}
function startGame() {
    start.innerHTML = "RESTART";
    
    setSlotWidth();
    score.innerHTML = 0;
    moves.innerHTML = 0;
    var realArray = makeRandArray(level);
    formMatrix(realArray,level);
    flipcard();
}
function makeRandArray(level) {//This function will make an array of random numbers
    size = (level * level) / 2;//If the size is 2, then the size of the array will be 4 because we need 2 of each number similarly if it is 4 then the size of array will be 16
    let tempArray = [];//initiating the tempArray variable and setting it to an empty array, this array stores the random numbers
    for (let i = 0; i < size; i++) {
        let randomNumber = Math.floor(Math.random() * 20);//generating a random number between 0 and 20,generally math.random produce random numbers between 0 and 1, so we multiply it by 20 to get a number between 0 and 20
        if (tempArray.includes(randomNumber)) {//If the random number is already present in the array, then we will not push it to the array
            i--;
            continue;
        }
        tempArray.push(randomNumber);//if the random number is not present in the array, then we will push it to the array
    }
    let realArray = [...tempArray, ...tempArray];//we will make a new array by combining the tempArray twice, this is done because we need 2 of each number
    realArray.sort(() => Math.random() - 0.5);//This will shuffle the array
    return realArray;//realArray will be returned which is the result of the function
}
function formMatrix(realArray, size) {//This function will form the matrix, it will take the realArray and the size as the parameters
    gameBody.innerHTML = "";
    for (let i = 0; i < size * size; i++) {
        gameBody.innerHTML += `
        <div class="slots col">  
              <div class="cardFront"> ? </div> 
              <div class="cardBack">  ${realArray[i]}</div>
        </div>`
    }
}
function flipcard() {//This function will flip the card
        let firstCard = null;
        let secondCard = null;
        let card = document.querySelectorAll('.slots');
        card.forEach(card => {
        card.addEventListener('click', function () {
            card.classList.toggle('flipped');
            if (firstCard == null) {
                firstCard = card;
                firstCardValue = firstCard.children[1].innerHTML;
            } else {
                secondCard = card;
                if (firstCard == secondCard) {
                    return;
                }
                var secondCardValue = secondCard.children[1].innerHTML;
                matchCards(firstCardValue, secondCardValue, firstCard, secondCard);
                firstCard = null;
                secondCard = null;
                firstCardValue = null;
                secondCardValue = null;
            }
        });
    });
}

function matchCards(firstCardValue, secondCardValue, firstCard, secondCard) {
    if (firstCardValue == secondCardValue) {
        score.innerHTML = parseInt(score.innerHTML) + 1;
        console.log("matched");
        firstCard.style.pointerEvents = "none";
        secondCard.style.pointerEvents = "none";
        firstCard = null;
        secondCard = null;

        if (score.innerHTML == level*level/ 2) {
            gameBody.innerHTML = `
            <div class="col">
                        <div class="win">You Win</div>
                        <div class="win">Score:${score.innerHTML}</div>
                        <div class="win">Moves:${moves.innerHTML}</div>
                        <div class="next"><button id="nextLevel">NEXT LEVEL</button></div>
            </div>            `;
            nextLevel.addEventListener('click', function () {
                level= level + 2;
                console.log(size);
                startGame();
            })
        }
    } else {
        console.log("not matched");
        var newMoves = parseInt(moves.innerHTML);//parseInt will convert the string to an integer, since we can only increment an integer
        moves.innerHTML = + newMoves + 1;
        setTimeout(() => {//we will set a timeout of 700ms, this will give the user some time to see the second card
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }, 700)
    }
}