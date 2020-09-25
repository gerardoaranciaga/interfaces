let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

let moviendo = false;
let figuraClickeada = null;

const maxFiguras = 50;
const tamaño = 40;
let figuras = [];

addFiguras();

function addRectangulo(){
    let posX = Math.round(Math.random() * canvas.width);
    let posY = Math.round(Math.random() * canvas.height);
    let color = randomRGBA();
    let rectangulo = new Rectangulo(posX,posY,tamaño,tamaño,color,ctx);
    figuras.push(rectangulo);
}

function addCirculo(){
    let posX = Math.round(Math.random()* canvas.width);
    let posY = Math.round(Math.random()* canvas.height);
    let color = randomRGBA();
    let circulo = new Circulo(posX,posY,25,color,ctx);
    figuras.push(circulo);
}

function addFigura(){
    if(Math.random() * 2 > 1){
        addRectangulo();
    }else{
        addCirculo();
    }
}

function drawFiguras(){
    clearCanvas();
    for(let i = 0; i < figuras.length; i++){
        figuras[i].draw();
    }
}

function clearCanvas(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function addFiguras(){
    for(i = 0; i < maxFiguras; i++){
        addFigura();
    }
    drawFiguras();
}

/*function addFiguras(){
    addFigura();
    if(figuras.length < maxFiguras){
        setTimeout(addFiguras,10);
    }
}

setTimeout(() => {
    addFiguras();
},100)*/

function randomRGBA(){
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;
    return `rgb(${r},${g},${b},${a})`;
}

function buscarFiguraClickeada(x,y){
    for(i = 0; i < figuras.length; i++){
        let figura = figuras[i];
        if(figura.estaAdentro(x,y)){
            return figura;
        }
    }
}

/*canvas.addEventListener("click",function(e){
    drawFiguras();
    figuraClickeada = buscarFiguraClickeada(e.layerX,e.layerY);
    if(figuraClickeada != null){
        figuraClickeada.setSeleccionadaOn();
        figuraClickeada.draw();
        figuraClickeada.setSeleccionadaOff();
    }
})*/

canvas.addEventListener("mousedown",function(e){
    figuraClickeada = buscarFiguraClickeada(e.layerX,e.layerY);
    if(figuraClickeada != null){
        moviendo = true;
    }
});

canvas.addEventListener("mousemove",function(e){
    let x = e.layerX;
    let y = e.layerY;
    if(moviendo == true){
        figuraClickeada.setPosXY(x,y);
        drawFiguras();  
    }
});

canvas.addEventListener("mouseup",function(){
    moviendo = false;
    if(figuraClickeada != null){
        figuraClickeada.offsetOff();
    }
    figuraClickeada = null;
});





