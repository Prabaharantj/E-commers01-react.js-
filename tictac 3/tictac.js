let boxs=document.querySelectorAll(".box");
let btnrestart=document.querySelector("#Restart");
let statustext=document.querySelector(".status");
let x="<img src='x.png.png' style='width:90px'>";
let o="<img src='o.png.png' style='width:90px'>";

let oppertunitywin=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let opption=["","","","","","","","",""];
let currentplayer=x;
let player="x";
let running=false;

initial();
function initial(){
    boxs.forEach(box=>box.addEventListener('click', boxes));
    btnrestart.addEventListener("click",restartgame);
    statustext.textContent=`${player} your turn`;
    running=true;
}

function boxes(){
   let index=this.dataset.index;
   if (opption[index]!=""  || !running){
    return;
   }
     update(this,index);
     winnercheck();
}

function update(box,index){
    opption[index]=player;
    box.innerHTML=currentplayer;
}


function changplayers(){
    player=(player=='x')? "o" :"x";
    currentplayer=(currentplayer==x) ? o :x; 
    statustext.textContent=`${player} your turn`;
}

function winnercheck(){
    let iswin=false;
    for(let i=0; i<oppertunitywin.length;i++){
        let condition=oppertunitywin[i];///[0,1,2]
        let box1=opption[condition[0]];
        let box2=opption[condition[1]];
        let box3=opption[condition[2]];

      if(box1=="" || box2=="" || box3==""){
        continue;
      }

     if(box1==box2 && box2==box3){
            iswin=true;

            boxs[condition[0]].classList.add('win');
            boxs[condition[1]].classList.add('win')
            boxs[condition[2]].classList.add('win')

        }
    }



    if(iswin){
        statustext.textContent=`${player} you won the game`;
        running=false;
    }
    else if(!opption.includes("")){
        statustext.textContent=`the games is Draw `;
        running=false;
    }
    else{
        changplayers();
    }

}

function restartgame(){
  opption=["","","","","","","","",""];
  currentplayer=x;
  player="x";
  running=false;
  statustext.textContent=`${player} your turn`;


  boxs.forEach(box=>{
    box.innerHTML='';
    box.classList.remove('win')
  })
}
