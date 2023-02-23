const gameBody = document.getElementById('gameBody');

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
        card.forEach(card => {
        card.addEventListener('click',function(){
        card.classList.toggle('flipped');
        })})
    }
function checkMatch(){

}


