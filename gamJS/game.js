    var sound = new Audio ('./audio/electro.mp3');
    // var sound2 = new Audio('./audio/tiengda.mp3');

    let canvas = document.getElementById('myCanvas');
    let context = canvas.getContext('2d');


     let   x = canvas.width/2 -30;
     let   y =canvas.height-20;
     let   dx = 4;
     let   dy = 4;
     let   radius = 10;
    var cell = {
        offsetX: 5,
        offsetY: 10,
        margin: 5,
        row: 5,
        col: 7,
        width: 60,
        height: 20

    }
    var starGame = false;
    var isGameWIn = false;
    var userScore = 0;
    var maxScore = cell.row*cell.col;
    var arrCell =[];
    for (let row = 0; row <cell.row; row++){
        for (let col = 0; col <cell.col;col++ ){
            arrCell.push({
                    x: cell.margin + col * (cell.width + cell.offsetX),
                    y: cell.margin + row * (cell.height + cell.offsetY),
                    isBroken: false
                }
            )
        }
    }
    var vantruot = {
        x: canvas.width/2 -30,
        y: canvas.height - 10,
        width: 60,
        height: 10,
        speed: 5,

        isleftspeed: false,
        isrightspeed: false,
    }
    var isGameOver = false;
    // var  = {
    //
    // }
    document.addEventListener( "keyup", function (event){
        if (event.keyCode == 37) {
            vantruot.isleftspeed = false ;
        } else if (event.keyCode == 39) {
            vantruot.isrightspeed = false;
        }
    })
    document.addEventListener("keydown", function (event) {
        if (event.keyCode == 37) {
            vantruot.isleftspeed = true ;
        } else if (event.keyCode == 39) {
            vantruot.isrightspeed =true;
        }
        }
    )




    function ball() {
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = '#26a1dd';
        context.fill();
        context.closePath();

    }

    function vanTruot(){
        context.beginPath();

        // context.drawImage(img,vantruot.x,vantruot.y,vantruot.width,vantruot.height)
        context.rect (vantruot.x, vantruot.y, vantruot.width, vantruot.height);
        context.fillStyle = '#888888';
        context.fill();
        context.closePath();
    }

    function cellGach() {
        arrCell.forEach(function (b) {
            if (!b.isBroken) {
                context.beginPath();
                let img = new Image();
                img.src= './img/gach.jpg';
                context.drawImage(img, b.x, b.y, cell.width, cell.height);
                // context.rect(
                //     b.x,
                //     b.y,
                //     cell.width,
                //     cell.height
                // )

                context.fillStyle ="orangered";
                context.fill();
                context.closePath();
            }
        })
    }
    function vaCham(){
        if (x < radius || x > canvas.width-radius){
            dx = -dx;
        }
        if (y < radius ){
            dy = - dy;
        }
    }
    function upDateBall(){
        x -= dx;
        y -= dy;
    }
    function vaChamVanTruot(){
        if(x+radius >= vantruot.x && x +radius <= vantruot.x + vantruot.width && y + radius >= vantruot.y && y + radius <= vantruot.y + vantruot.height){
            dy = -dy;
        }
    }
    function vaChamGach(){
        arrCell.forEach(function (b){
            if (!b.isBroken){
                if (x >= b.x && x <= b.x +cell.width && y + radius >= b.y && y - radius <= b.y + cell.height){
                    dy = -dy;
                    b.isBroken = true;
                    userScore++;
                    // sound2.play();
                    if (userScore == maxScore){
                        isGameWIn = true;
                        isGameOver = true;
                        // sound2.play();
                    }
                }
            }
        }
        )
    }
    function upDateVanTruot(){

            if (vantruot.isleftspeed) {
                vantruot.x -= vantruot.speed
            }
            if (vantruot.isrightspeed) {
                vantruot.x += vantruot.speed
            }
            if (vantruot.x < 0) {
                vantruot.x = 0;
            }
            if (vantruot.x > canvas.width - vantruot.width) {
                vantruot.x = (canvas.width - vantruot.width);
            }
    }
    function checkGameOver(){
        if(y > canvas.height-radius){
            isGameOver = true;
        }
    }
    function sprint(){
        if (isGameWIn==true){
            confirm('You Win');
        }if (isGameOver==true){
            confirm('Game Over')
        }
    }

    function clearBall() {
    if(!isGameOver) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById("score").innerHTML = `Score: ${userScore}`
        ball();
        cellGach();
        vaCham();
        checkGameOver();
        upDateBall();
        vanTruot();
        upDateVanTruot()
        vaChamVanTruot();
        vaChamGach();
        requestAnimationFrame(clearBall);
    }else {
        sprint();
    }
    }
    // clearBall();
    function startGame() {
        clearBall();
        sound.play();
    }

