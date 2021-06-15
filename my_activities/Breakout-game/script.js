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
    speed: 5,
    dx: 4,
    dy: -4

}

// function to draw ball
function drawBall(){
    gamearea.beginPath();
    gamearea.arc(Ball.x, Ball.y, Ball.radius, 0, Math.PI * 2);
    gamearea.fillStyle = '#fc2c03';
    gamearea.fill();
    gamearea.closePath();
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------- creating paddle -----------------------------------------------------------------------------------------

// get paddle properties
let Paddle ={
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
    gamearea.fillStyle = '#e7fc03';
    gamearea.fill();
    gamearea.closePath();
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------- creating score ---------------------------------------------------------------------------------------
let score = 0;
let stage = 0;

function drawscore(){
    gamearea.font = '20px Aerial'
    gamearea.fillText(`Score : ${score}`, canvas.width - 100, 30);
    gamearea.fillText(`Stage : ${stage}`, 10, 30);
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
let bricks = [];
for(let i = 0; i < rows; i++){
    bricks[i] =[];
    for(let j = 0; j < clms; j++){
        const x = i *(brickprop.w + brickprop.padding) + brickprop.xoffset;
        const y = j * (brickprop.h + brickprop.padding) + brickprop.yoffst;
        bricks[i][j] = {x,y, ...brickprop}
    }
}

function drawBricks(){
    bricks.forEach(col =>{
        col.forEach(brick =>{
            gamearea.beginPath();
            gamearea.rect(brick.x, brick.y, brick.w, brick.h);
            gamearea.fillStyle = brick.visibility ? '#e7fc03':'transparent'
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
    if(Paddle.x < 0){
        Paddle.x = 0;
    }
    else if(Paddle.x + Paddle.w > canvas.width){
        Paddle.x = canvas.width - Paddle.w;
    }
}


// handling right and left movements
function keyDown(e){
    if(e.key === 'ArrowRight' || e.key === 'Right'){
        Paddle.dx = Paddle.speed;
        // console.log(1);
    }
    else if(e.key === 'Left' || e.key === 'ArrowLeft'){
        Paddle.dx = -Paddle.speed;
        // console.log(2);
    }
}

function keyUp(e){
    if(e.key === 'Left' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Right'){
        Paddle.dx = 0;
    }

}

// creating update function which will draw everything again and again

function update(){
    draw();
    movePaddle();
    moveBall();
    requestAnimationFrame(update);
}


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------- moving ball functionality------

function moveBall(){
    Ball.x += Ball.dx;
    Ball.y += Ball.dy;

// wall conditions
    if(Ball.x - Ball.radius< 0 || Ball.x + Ball.radius > canvas.width){
        Ball.dx *= -1;
    }
    if(Ball.y - Ball.radius < 0 || Ball.y + Ball.radius > canvas.height){
        Ball.dy *= -1;
    }

    // paddle collision
    if(Ball.x > Paddle.x && Ball.x  < Paddle.x + Paddle.w
        && Ball.y+Ball.radius > Paddle.y){
            Ball.dy = -Ball.speed;
        }

// brick collision
        bricks.forEach(row =>{
            row.forEach(brick =>{
                if(brick.visibility){
                    if(Ball.x > brick.x && 
                        Ball.x < brick.x + brick.w &&
                        Ball.y - Ball.radius < brick.y + brick.h &&
                        Ball.y + Ball.radius > brick.y)
                    {
                        Ball.dy *= -1;
                        brick.visibility = false;
                        increasescore();
                    }
                }
            })
        })

        // missing paddle
        if(Ball.y + Ball.radius > canvas.height){
            score = 0;
            stage = 0;
            showallbricks();
        }
}

// showing bricks again
function showallbricks(){
    bricks.forEach(row =>{
        row.forEach(brick =>{
            brick.visibility = true;
        })
    })
}
//------------------------------------------- score handeler -------------
function increasescore(){
    score++;
    // if(score == rows * clms) stage = 1;

    if(score % (rows * clms) == 0){
        stage++;
        showallbricks()
    }

}

//---------------------------------

// main draw function
function draw(){
    gamearea.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawscore();
    drawBricks();
}

// keybord events for paddle
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

update();
