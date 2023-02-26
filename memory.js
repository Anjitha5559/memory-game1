const gameBody = document.getElementById('gameBody');
const score = document.getElementById('score');
const moves = document.getElementById('moves');
const start = document.getElementById('start');
let firstCard = null;
let secondCard = null;
score.innerHTML = 0;
moves.innerHTML = 0;
let size = 2;
start.addEventListener('click', startGame(size));
function startGame(size) {
    var realArray = makeRandArray(size);
    formMatrix(realArray, size);
    flipcard(size);
}
function makeRandArray(size) {
    size = (size * size) / 2;
    console.log(size);
    let tempArray = [];
    for (let i = 0; i < size; i++) {
        let randomNumber = Math.floor(Math.random() * 20);
        if (tempArray.includes(randomNumber)) {
            i--;
            continue;
        }
        tempArray.push(randomNumber);
    }
    let realArray = [...tempArray, ...tempArray];
    console.log(realArray);
    realArray.sort(() => Math.random() - 0.5);
    console.log(realArray);
    return realArray;
}
function formMatrix(realArray, size) {
    gameBody.innerHTML = "";
    for (let i = 0; i < size * size; i++) {
        gameBody.innerHTML += `
        <div class="slots">
        <div class="cardFront">
?  </div>
  <div class="cardBack">
        ${realArray[i]}
        </div>
    </div>`
    }
}
function flipcard(size) {
    let card = document.querySelectorAll('.slots');
    console.log(card);
    console.log("hwy there");
    let firstCard = null;
    let firstCardValue = null;
    let secondCard = null;
    console.log(size);
    card.forEach(card => {
        card.addEventListener('click', function () {
            card.classList.toggle('flipped');
            if (firstCard == null) {
                firstCard = card;
                firstCardValue = firstCard.children[1].innerHTML;
                console.log(firstCard);
                console.log(firstCardValue)
            } else {
                secondCard = card;
                console.log(secondCard);
                var secondCardValue = secondCard.children[1].innerHTML;
                console.log(secondCardValue);
                if (firstCardValue == secondCardValue) {
                    console.log("match");
                    var newScore = parseInt(score.innerHTML);
                    score.innerHTML = + newScore + 1;
                    firstCard.style.pointerEvents = "none";
                    secondCard.style.pointerEvents = "none";
                    console.log(score.innerHTML);
                    console.log(newScore);
                    firstCard = null;
                    secondCard = null;
                    console.log(size);
                    console.log(size * size / 2);
                    console.log(score.innerHTML);
                    if (score.innerHTML == size * size / 2) {
                        gameBody.innerHTML = `<div id="win">You Win</div>
                        <div id="win">Your Score is ${score.innerHTML}</div>
                        <div id="win">Your Moves are ${moves.innerHTML}</div>
                        <div id="win">Your Accuracy is ${score.innerHTML / moves.innerHTML * 100}%</div>
                        <div id="next"><button id="nextLevel">NEXT LEVEL</button></div>`;
                        nextLevel.addEventListener('click', function () {
                            size = size + 2;
                            score.innerHTML = 0;
                            moves.innerHTML = 0;
                            console.log(size);
                            startGame(size);
                        })

                    }

                } else {
                    var newMoves = parseInt(moves.innerHTML);
                    moves.innerHTML = + newMoves + 1;
                    console.log(moves.innerHTML);
                    console.log(newMoves);
                    setTimeout(() => {
                        console.log("no match");
                        firstCard.classList.remove('flipped');
                        secondCard.classList.remove('flipped');
                        firstCard = null;
                        secondCard = null;
                    }, 1000)
                }
            }
        });
    });
}



