// ----------------------------------------------------showing rules and hiding it--------------------------------------------------------------------------------------

const showrule = document.querySelector(".rules-btn");
const rules = document.querySelector("#rules");
const closebtn = document.querySelector('#close-btn');
showrule.addEventListener("click",function(){
    rules.classList.add('show');
    return;
})

closebtn.addEventListener('click',()=>{
    rules.classList.remove('show');
})

// ----------------------------------------------creating canvas and balls, paddle and score----------------------------------------------------------------------------

const canvas = document.getElementById('game-area');
const gamearea = canvas.getContext('2d');



//---------------------------------------------------------- creating ball using 'path'---------------------------------------------------------------------------------

// get ball properties
const Ball={
    y: canvas.height / 2,
    x: canvas.width / 2,
    radius: 10,
    speed: 8,
    dx: 4,
    dy: -4

}

// function to draw ball
function drawBall(){
    gamearea.beginPath();
    gamearea.arc(Ball.x, Ball.y, Ball.radius, 0, Math.PI * 2);
    gamearea.fillStyle = '#0095dd';
    gamearea.fill();
    gamearea.closePath();
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------- creating paddle -----------------------------------------------------------------------------------------

// get paddle properties
const Paddle ={
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    dx: 0,
    speed:8
}

// function to draw paddle
function drawPaddle(){
    gamearea.beginPath();
    gamearea.rect(Paddle.x, Paddle.y, Paddle.w, Paddle.h);
    gamearea.fillStyle = '#0095dd';
    gamearea.fill();
    gamearea.closePath();
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------- creating score ---------------------------------------------------------------------------------------
let score = 0;

function drawscore(){
    gamearea.font = '20px Aerial'
    gamearea.fillText(`Score : ${score}`, canvas.width - 100, 30);
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------ creating bricks -----------------------------------------------------------------------------------

const rows = 9;
const clms = 5;

// bricks property
let brickprop = {
    h:20,
    w:70,
    padding: 10,
    xoffset:45,
    yoffst:60,
    visibility: true
}

// funtion to create brick layout
const bricks = [];
for(let i = 0; i < rows; i++){
    bricks[i] =[];
    for(let j = 0; j < clms; j++){
        const x = i *(brickprop.w + brickprop.padding) + brickprop.xoffset;
        const y = j * (brickprop.h + brickprop.padding) + brickprop.yoffst;
        bricks[i][j] = {x,y, ...brickprop}
    }
}

// console.log(bricks);
function drawBricks(){
    bricks.forEach(col =>{
        col.forEach(brick =>{
            gamearea.beginPath();
            gamearea.rect(brick.x, brick.y, brick.w, brick.h);
            gamearea.fillStyle = brickprop.visibility ? '#0095dd':'white'
            gamearea.fill();
            gamearea.closePath();
        })
    })

}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------ moving paddle -------------------------------------------------------------------------------------

function movePaddle(){
    Paddle.x += Paddle.dx;

    // wall conditions
    if(Paddle.x + Paddle.w < 0){
        Paddle.x = 0;
    }
    else if(Paddle.x + Paddle.w > canvas.width){
        Paddle.x = canvas.width - Paddle.w;
    }
}



function keyDown(e){
    console.log(e.key);
    if(e.key === 'ArrowRight' || e.key === 'Right'){
        // console.log("right")
        Paddle.dx = Paddle.speed;
        console.log(Paddle.speed);
        console.log(Paddle.x);
    }
}

function keyUp(e){
    // console.log(e.key);

}



// creating update function which will draw everything again and again

function update(){
    draw();
    movePaddle();
}


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------



// main draw function
function draw(){
    drawBall();
    drawPaddle();
    drawscore();
    drawBricks();
}

update();

// keybord events for paddle
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

