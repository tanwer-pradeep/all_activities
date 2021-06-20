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
    colour: 'white'
}

// ball property
ballprop={
    ballx: cprop.wt/2,
    bally: cprop.ht/ 2,
    ballr: 8
}


function rendercanvas() {
    //canvas colour filling
    context.fillStyle = 'black'
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
    document.querySelector('body').appendChild(canvas);
}

createcanvas();
rendercanvas();