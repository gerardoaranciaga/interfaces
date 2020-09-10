let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let rect = canvas.getBoundingClientRect();
let x = 0; y = 0; dibujando = false; color = "black"; grosor = 1;

function canvascolor(e){
    color = e;
}

function canvasgrosor(e){
    grosor = e;
}

canvas.addEventListener("mousedown",function(e){
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    dibujando = true;
})

canvas.addEventListener("mousemove",function(e){
    if(dibujando === true){
        dibujar(x,y,e.clientX - rect.left,e.clientY - rect.top);
    }
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
})

canvas.addEventListener("mouseup",function(e){
    if(dibujando === true){
        dibujar(x,y,e.clientX - rect.left,e.clientY - rect.top);
    }
    x = 0;
    y = 0;
    dibujando = false;
})

function dibujar(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = grosor;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
}