let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let rect = canvas.getBoundingClientRect();
let x = 0; y = 0; dibujando = false; color = "black"; grosor = 1;
ctx.lineWidth = 1;

function dibujar(e){
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    if(dibujando == true){
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

canvas.addEventListener("mousemove",dibujar);

canvas.addEventListener("mousedown",function(){
    dibujando = true;
    ctx.beginPath();
    ctx.moveTo(x,y);
    canvas.addEventListener("mousemove",dibujar);
});

canvas.addEventListener("mouseup",function(){
    dibujando = false;
});

function canvascolor(e){
    ctx.strokeStyle = e;
}

function canvasgrosor(e){
    ctx.lineWidth = e;
}
