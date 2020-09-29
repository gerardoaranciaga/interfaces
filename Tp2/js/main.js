let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

let moviendo = false;
let fichaClickeada = null;

let tablero = new Tablero(ctx);
let juego1 = new Juego();
const maxFichas = 50;
const sectorFichas1 = 250;
const sectorFichas2 = 1050;
const tamañoFicha = 35;
let fichas = [];

inciarTablero();

function addFicha(){
    let jugador;
    let posX = 0;
    let posY = Math.round(Math.random() * (canvas.height));
    let color;
    if(posY < tamañoFicha){
        posY += tamañoFicha;
    }if(posY > canvas.height - tamañoFicha){
        posY -= tamañoFicha;
    }
    if(fichas.length < (maxFichas/2)){
        jugador = "j1";
        color = "blue";
        posX = Math.round(Math.random() * (sectorFichas1));
        if(posX < tamañoFicha){
            posX += tamañoFicha;
        }if(posX > sectorFichas1 - tamañoFicha){
            posX -= tamañoFicha;
        }
    }else{
        jugador = "j2";
        color = "green";
        posX = Math.round(Math.random() * (canvas.width - sectorFichas2) + sectorFichas2);
        if(posX < sectorFichas2 + tamañoFicha){
            posX += tamañoFicha;
        }if(posX > canvas.width - tamañoFicha){
            posX -= tamañoFicha;
        }
    }
    let ficha = new Ficha(posX,posY,tamañoFicha,color,ctx,jugador);
    fichas.push(ficha);
}


function colorFicha(){
    ctx.beginPath();
    let img = new Image();
    img.src = "../img/aguila.png";
    //let imagen = ctx.createPattern(img,"repeat");
    //ctx.arc(700,300,35,0,2*Math.PI);
    //ctx.rect(0, 0, 150, 100);
    //ctx.fillStyle = imagen;
    //ctx.fill();
    img.onload = ctx.arc(20,20,35,0,2*Math.PI);
    ctx.fillStyle = img;
    ctx.closePath();
}

function drawFichas(){
    clearCanvas();
    for(let i = 0; i < fichas.length; i++){
        fichas[i].draw();
    }
}

function inciarTablero(){
    addFichas();
    drawFichas();
    tablero.draw();
    //colorFicha();
}

function drawTablero(){
    drawSectorFichas();
    colorFicha();
}

function drawSectorFichas(){
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(sectorFichas1,0);
    ctx.lineTo(sectorFichas1,canvas.height);
    ctx.moveTo(sectorFichas2,0);
    ctx.lineTo(sectorFichas2,canvas.height);
    ctx.stroke();
    ctx.closePath();
}

function clearCanvas(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function addFichas(){
    for(i = 0; i < maxFichas; i++){
        addFicha();
    }
}

function randomRGBA(){
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;
    return `rgb(${r},${g},${b},${a})`;
}

function buscarFichaClickeada(x,y){
    for(i = 0; i < fichas.length; i++){
        let ficha = fichas[i];
        if(ficha.estaAdentro(x,y)){
            ficha.setSeleccionadaOn();
            return ficha;
        }
    }
}

canvas.addEventListener("mousedown",function(e){
    fichaClickeada = buscarFichaClickeada(e.layerX,e.layerY);
    if(fichaClickeada != null){
        moviendo = true;
    }
});

canvas.addEventListener("mousemove",function(e){
    let x = e.layerX;
    let y = e.layerY;
    if(moviendo == true){
        fichaClickeada.setPosXY(x,y);
        drawFichas();
        tablero.draw();  
    }
});

canvas.addEventListener("mouseup",function(){
    moviendo = false;
    if(fichaClickeada != null){
        fichaClickeada.offsetOff();
        fichaClickeada.setSeleccionadaOff();
    }
    fichaClickeada = null;
});





