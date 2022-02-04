const btnPlus = document.querySelector('.plusStile');
const btnMinus = document.querySelector('.minusStile');
const inf = document.querySelector('.limitaInf');
const sup = document.querySelector('.limitaSup');
const bg = document.querySelector('.color');

let caunt = 5;


const adauga = () => {
    caunt++;
        

    if(caunt <= 10)
        { if(caunt < 4){
            bg.classList.add('verde');
            }else if(caunt>=4 && caunt <=7){
                bg.classList.remove('verde');
                bg.classList.add('albastru');
                console.log("caunt este intre 4 si 7 ");
            }else if(caunt >7){
                bg.classList.remove('albastru');
                bg.classList.add('rosu');
            console.log("caunt este mai mare ca 7  ");}
        
        document.querySelector("#h2").innerHTML = caunt
    }else{
        btnPlus.disabled = true;
        inf.innerHTML = "Ai atins limita superioara";
        inf.classList.add('inf');
    }
    

}

const scade = ()=> {
    caunt--;
    if(caunt >= 0 ){
         if(caunt >=4 && caunt <=7){
            bg.classList.add('albastru');
            bg.classList.remove('verde');
            console.log("caunt este intre 4 si 7 ");
        }else if(caunt < 4){
            console.log("caunt este mai mic decat 4  ");
            bg.classList.add('verde');
            bg.classList.remove('rosu');
            bg.classList.remove('albastru');
            }
    
      document.querySelector("#h2").innerHTML = caunt;
           
    }else{
        btnMinus.disabled = true;
        sup.innerHTML = "Ai atins limita inferioara";
        sup.classList.add('inf');
    }
}

btnPlus.addEventListener("click", adauga);
btnMinus.addEventListener("click", scade);