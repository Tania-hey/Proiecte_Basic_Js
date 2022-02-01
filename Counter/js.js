const contorText = document.querySelector('#p');
const increase = document.querySelector('#Incrase');
const btnreset = document.querySelector('#Reset');
const btnDecrease = document.querySelector('#Decrease');

increase.addEventListener('click', crescator);
btnreset.addEventListener('click', reset);
btnDecrease.addEventListener('click', descrescator);


let contor=0;

function crescator(){
    clearTimeout(crescator);
    clearTimeout(descrescator);
    if(contor <= 10){
    contorText.innerHTML = contor;
    setTimeout(crescator, 700);
    contor=contor+1;
    }
    else
    alert('Nu se mai poate baga numere.')
}
  
function reset(){
    clearTimeout(crescator);
    clearTimeout(descrescator);
    contor = 0;
    contorText.innerHTML = contor;
}

function descrescator(){
    clearTimeout(crescator);
    clearTimeout(descrescator);
    
    if(contor >= -10)
    {  contorText.innerHTML = contor;
        setTimeout(descrescator, 700);
        contor--;
    }else{
    alert('Nu se mai pot adauga numere.');
    }
}