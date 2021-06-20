// ------------------------------- showing rules and hinding them----------------------------------------------------------------
const showrule = document.querySelector(".rules-btn");
const rules = document.querySelector("#rules");
const closebtn = document.querySelector('#close-btn');
let startbtn = document.querySelector('.Start');
let start = false;
startbtn.addEventListener("click",function(){
    startbtn.classList.add('hidden');
    start = true
    return;
})
showrule.addEventListener("click",function(){
    rules.classList.add('show');
    return;
})

closebtn.addEventListener('click',()=>{
    rules.classList.remove('show');
})
// -------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------ canvas setting -----------------------------------------------------------------------
let canvas = document.createElement('canvas');
canvas.classList.add('ga');
let context = canvas.getContext('2d');

// --------------------------------------------------------------------------------------------------------------------------------

// --------------------------------- paddle handling ------------------------------------------------------------------------------
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e){
    if(e.key === 'ArrowUp' || e.key === 'Up'){
        paddle.dy2 = -paddle.speed;
        // console.log(e.key);
    }
    else if(e.key === 'Down' || e.key === 'ArrowDown'){
        paddle.dy2 = paddle.speed;
        //     // console.log(2);
    }else if(e.key  === 'w' || e.key === 'W'){
        paddle.dy = -paddle.speed;
        
    }else if(e.key === 's' || e.key === 'S'){
        paddle.dy = paddle.speed;
        
    }
}

function keyUp(e){
    if(e.key === 'Up' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Down'){
        paddle.dy2 = 0;
    }
    else if(e.key === 's' || e.key === 'S' || e.key  === 'w' || e.key === 'W'){
        paddle.dy = 0;
    }
    
}
// ---------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------- score managment ----------------------------------------------------------------
let leftscore = 0;
let rightscore = 0;
// ----------------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------- canvas property ----------------------------------------------------------------------
cprop = {
    ht: 500,
    wt: 1000
}
//------------------------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------- paddle property --------------------------------------------------------------------
paddle = {
    height: 50,
    x:5,
    x2:cprop.wt - 5 -10,
    y:cprop.ht / 2, 
    y2:cprop.ht / 2,
    width: 10,
    colour: 'white',
    dy:0,
    dy2:0,
    padding:2,
    speed: 8

}
//------------------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------  ball property -------------------------------------------------------------------
ballprop={
    ballx: cprop.wt/2,
    bally: cprop.ht/ 2,
    ballr: 5,
    dx: 4,
    dy:5,
    speed: 3

}
// ----------------------------------------------------------------------------------------------------------------------------------

function rendercanvas() {
    //canvas colour filling
    context.fillStyle = '#067d5b'
    context.fillRect(0, 0, canvas.width, canvas.height);

    // paddle creation
    context.fillStyle = paddle.colour
    // left paddle
    context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    // right paddle
    context.fillRect(paddle.x2, paddle.y2 ,paddle.width, paddle.height);
    // dashed line in the middle of canvas
    context.beginPath();
    context.setLineDash([10]);
    context.moveTo(cprop.wt / 2, 0);
    context.lineTo(cprop.wt / 2, 500);
    context.strokeStyle = 'white'
    context.stroke();

    // ball (initially at the centre of canvas)
    context.beginPath();
    context.arc(ballprop.ballx, ballprop.bally-ballprop.ballr, ballprop.ballr, 0, Math.PI * 2);
    context.fillStyle = 'white'
    context.fill();

    //score left
    context.font = '20px serif'
    context.fillText(leftscore,450,20);

    // score right
    context.font = '20px serif'
    context.fillText(rightscore,540,20);
}

function createcanvas() {
    canvas.width = cprop.wt;
    canvas.height = cprop.ht;
    document.querySelector('body').appendChild(canvas);
}


// -------------------------------------------------- ball movement managment --------------------------------------------------------
function moveball(){
    ballprop.ballx += ballprop.dx;
    ballprop.bally += ballprop.dy;
    // ceil and floor collision detection
    if(ballprop.bally - ballprop.ballr < 0 || ballprop.bally + ballprop.ballr > canvas.height){
        ballprop.dy *= -1;
    }
    if(ballprop.bally - ballprop.ballr < paddle.y2 + paddle.height &&
         ballprop.bally + ballprop.ballr > paddle.y2 &&
        ballprop.ballx+ballprop.ballr== paddle.x2
        ){
        ballprop.dx *= -1
        ballprop.dy *= 1;

    }else if((ballprop.bally - ballprop.ballr < paddle.y + paddle.height &&
        ballprop.bally + ballprop.ballr > paddle.y &&
       ballprop.ballx-ballprop.ballr == 15)){
        ballprop.dx *= -1
        ballprop.dy *= 1;
       }
       else if(ballprop.ballx+ballprop.ballr > cprop.wt || ballprop.ballx-ballprop.ballr < 0){
        ballprop.dx *= -1
        if(ballprop.ballx > 500){
            leftscore++;
        
            ballprop.ballx = cprop.wt / 2;
            ballprop.bally = cprop.ht / 2;
        }else {
            rightscore++;
            ballprop.ballx = cprop.wt / 2;
            ballprop.bally = cprop.ht / 2;
        }

       }
}

// --------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------- paddle movement managment --------------------------------------------------------------
function movepaddle(){
    // console.log(paddle.y);
    paddle.y += paddle.dy
    paddle.y2 += paddle.dy2
    // console.log(paddle.y);

    if(paddle.y < 0){
        paddle.y = 0;

    }else if(paddle.y +paddle.height > canvas.height){
        paddle.y = canvas.height - paddle.height ;
    }
    if(paddle.y2 < 0){
        paddle.y2 = 0;

    }else if(paddle.y2 +paddle.height > canvas.height){
        paddle.y2 = canvas.height - paddle.height ;
    }
}

// -------------------------------------------------------------------------------------------------------------------------------------------

function update(){
    context.clearRect(0,0,canvas.width, canvas.height);
    createcanvas();
    if(start == true) moveball();
    rendercanvas();
    movepaddle();
    if(leftscore == 5 || rightscore == 5){
        start = false;
        // startbtn.innerHTML = 'Play Again'
        startbtn.classList.remove('hidden');
    }
    requestAnimationFrame(update);

}

update();

