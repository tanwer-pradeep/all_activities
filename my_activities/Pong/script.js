let canvas = document.createElement('canvas');
canvas.classList.add('ga');
let context = canvas.getContext('2d');

// canvas property
cprop = {
    ht: 500,
    wt: 1000
}

// paddle property
paddle = {
    height: 50,
    width: 10,
    colour: 'white',
    dy:0,
    speed: 8

}

// ball property
ballprop={
    ballx: cprop.wt/2,
    bally: cprop.ht/ 2,
    ballr: 8,
    dx: 4,
    dy:5,
    speed: 8

}


function rendercanvas() {
    //canvas colour filling
    context.fillStyle = '#067d5b'
    context.fillRect(0, 0, canvas.width, canvas.height);

    // paddle creation
    context.fillStyle = paddle.colour
    // left paddle
    context.fillRect(5, canvas.height / 2 - paddle.height, paddle.width, paddle.height);
    // right paddle
    context.fillRect(canvas.width - 5 - paddle.width, canvas.height / 2 - paddle.height, paddle.width, paddle.height);
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
    context.fillText('0',450,20);

    // score right
    context.font = '20px serif'
    context.fillText('0',540,20);
}



function createcanvas() {
    canvas.width = cprop.wt;
    canvas.height = cprop.ht;
    document.querySelector('.gamearea').appendChild(canvas);
}

function moveball(){
    ballprop.ballx += ballprop.dx;
    ballprop.bally += ballprop.dy;
    // ceil and floor collision detection
    if(ballprop.bally - ballprop.ballr < 0 || ballprop.bally + ballprop.ballr > canvas.height){
        ballprop.dy *= -1;
    }
    if(ballprop.ballx - ballprop.ballr < 0 || ballprop.ballx + ballprop.ballr > canvas.width){
        ballprop.dx *= -1
        // update();
    }
}
function update(){
    context.clearRect(0,0,canvas.width, canvas.height);
    createcanvas();
    rendercanvas();
    moveball();
    requestAnimationFrame(update);

}

update();