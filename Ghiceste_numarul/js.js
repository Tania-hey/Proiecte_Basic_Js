const min = document.querySelector('#min');
const max = document.querySelector('#max');
const val = document.querySelector('#numar');
const buton = document.querySelector('#btnGhiceste');
const mesaj = document.querySelector('#mesaj');


let vmin = 0;
let vmax = 10;
const valoareGenerata = genereazaNumar(vmin, vmax);
let r = document.querySelector('#rez').innerHTML = (`Numarul este cuprins intre ${vmin} si ${vmax}.`)

let contor = 3;


buton.addEventListener("click" , ()=> {
    {
 
        if(val.value =='' || isNaN(val.value)){
            alert('Introdu un numar!')
        }else{
            let valUser = parseInt(val.value);
            contor--;
        
            if(contor == 0){
                alert(`Ai pierdut! Valoare era ${valoareGenerata}.`);
            }else{
             if(valUser != valoareGenerata){
                 alert('mai incearca!');
                
             }else{
                alert('Ai catigat!');
            }
            }
             
        }
     
    }
});
   
function genereazaNumar(vmin, vmax){
    return Math.floor(Math.random() * (vmax-vmin)+vmin +1);
 }
