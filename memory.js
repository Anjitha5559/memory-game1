const gameBody = document.getElementById('gameBody');
const score = document.getElementById('score');
let firstCard = null;
let secondCard = null;
startGame();
function startGame(){
    var realArray = makeRandArray();
    formMatrix(realArray);
    flipcard();
}
function makeRandArray(size=4){
    size = (size*size)/2;
    console.log(size);
    let tempArray = [];
    for(let i=0;i<size;i++){
        let randomNumber = Math.floor(Math.random()*20);
        if(tempArray.includes(randomNumber)){
            i--;
            continue;
        }
        tempArray.push(randomNumber);
    }
    let realArray = [...tempArray,...tempArray];
    console.log(realArray);
    realArray.sort(() => Math.random() - 0.5);
    console.log(realArray);
    return realArray;
}
function formMatrix(realArray,size=4){
    gameBody.innerHTML="";
    for(let i=0;i<size*size;i++){
       gameBody.innerHTML+=`
        <div class="slots">
        <div class="cardFront">
?  </div>
  <div class="cardBack">
        ${realArray[i]}
        </div>
    </div>`
    }
}
function flipcard(size=4){
    let card = document.querySelectorAll('.slots');
    console.log(card);
    console.log("hwy there");
    let firstCard = null;
    let firstCardValue = null;
    let secondCard = null;
    card.forEach(card => {
        card.addEventListener('click',function(){
            card.classList.toggle('flipped');
            if(firstCard==null){
                firstCard = card;
                firstCardValue = firstCard.children[1].innerHTML;
                console.log(firstCard);
                console.log(firstCardValue)
            } else {
                secondCard = card;
                console.log(secondCard);
                var secondCardValue = secondCard.children[1].innerHTML;
                console.log(secondCardValue);
                if(firstCardValue==secondCardValue){
                    console.log("match");
                    score.innerHTML = score.innerHTML+1;
                    firstCard.classList.remove('flipped');
                    secondCard.classList.remove('flipped');
                } else {
                    setTimeout(() =>{
                        console.log("no match");
                        secondCard.classList.remove('flipped');
                        firstCard = null;
                        secondCard = null;
                    },1000)
                }
            }
        });
    });
}




