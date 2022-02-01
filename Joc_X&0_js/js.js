const joc = document.querySelector('.joc');
const butonReset = document.querySelector('#reset');

let jucator = "X", mutari =0;
let tabla =[[null, null, null],
             [null, null,null],
             [null, null,null]];



genereazaTabla();

function genereazaTabla(){
    let l,c;
    for(let i=0; i<9;i++){
        let e = document.createElement('div');
        l = Math.round((i+2)/3)-1;
        c = Math.round(i%3);
        e.setAttribute('l',l);
        e.setAttribute('c',c);
        joc.appendChild(e);
    }
}

butonReset.addEventListener('click', resetGame);

joc.addEventListener('click', (e)=>{
    const tg = e.target;
    let l = parseInt(tg.getAttribute('l'));
    let c = parseInt(tg.getAttribute('c'));

    if(tabla[l][c])
    return;
    tabla[l][c] = jucator;
    tg.innerHTML= jucator;
    mutari++;
    if(gameOver(l,c,jucator)){
        alert(`Felicitari ${jucator}. Ai castigat!`);
        butonReset.disabled = false;
    }else if(mutari == 9){
        alert('Este remiza');
        butonReset.disabled = false;
    }else {
        schimbaJucator();
    }
})


function resetGame(){
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            tabla[i][j] = null;
        }
    }
    Array.from(document.querySelectorAll('div[l]')).forEach(e=>{
        e.textContent =null;
    });
    document.getElementById('jucator').textContent = jucator;
    mutari = 0;
}

function gameOver(l,c,jucator){
    let cnt = 0;
    for(i=0;i<3;i++){ // verifica linia
        if(tabla[l][i]== jucator)
        cnt++;
    }
    if(cnt == 3) return true;
    cnt = 0;
    for(let i=0;i<3;i++){ //verifica coloana 
        if(tabla[i][c] == jucator)
        cnt++;
    }
    if(cnt==3)return true;
    cnt = 0;
    if(l==c){// verifica diagonala principala
        for(let i=0; i<3;i++){ 
            if(tabla[i][i] == jucator)
                cnt++;
        }
        }else if(l+c ==2){// verificam diagonala secum=ndara
            for(let i=0;i<3;i++){
                if(tabla[i][3-i-1]== jucator)
                cnt++;
            }
        }
    if(cnt == 3) return true;
        return false;
}


function schimbaJucator(){
    if(jucator == "X")
    jucator = "0";
    else
        jucator = "X"
        document.querySelector('#jucator').innerHTML = jucator; 
}
