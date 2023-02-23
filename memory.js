const gameBody = document.getElementById('gameBody');

startGame();
function startGame(){
    makeRandArray();
    var tempArray = makeRandArray();
    formMatrix(tempArray);
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
    console.log(tempArray);
    return tempArray;

}
function formMatrix(tempArray,size=4){

    let realArray = [...tempArray,...tempArray];
    console.log(realArray);
    gameBody.innerHTML="";
    
    realArray.sort(() => Math.random() - 0.5);
    console.log(realArray);
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
        card.forEach(card => {
        card.addEventListener('click',function(){
        card.classList.toggle('flipped');
        })})
    }
function checkMatch(){
    
}


