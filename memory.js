const gameBody = document.getElementById('gameBody');
makeRandArray();

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
    formMatrix(tempArray);
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

        <div class="slots"id="card">
        <div class="cardFront">
?  </div>
  <div class="cardBack">
        ${realArray[i]}
        </div>
    </div>`


    }
}
flipcard();
function flipcard(size=4){

    for(let i=0;i<size*size;i++){
        let card = document.querySelectorAll('.slots');
        card.forEach(card => {
        card.addEventListener('click',function(){
        card.classList.toggle('flipped');
        })})
    }
}

