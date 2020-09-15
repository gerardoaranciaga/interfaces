let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let rect = canvas.getBoundingClientRect();
let x = 0; y = 0; dibujando = false; color = "black"; grosor = 1;
ctx.lineWidth = 1;
let foto = document.querySelector("#foto");

let imageData = ctx.createImageData(500,500);



function limpiar(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function dibujar(e){
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    if(dibujando == true){
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

document.querySelector("#limpiar").addEventListener("click",limpiar);

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

foto.onchange = e => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = readerEvent => {
        let content = readerEvent.target.result;
        let image = new Image();
        //image.crossOrigin = 'Anonymous';
        image.src = content;
        image.onload = function () {
            let imageAspectRatio = (1.0 * this.height) / this.width;
            console.log("1: "+1.0 * this.height);
            console.log("2: "+this.width);
            let imageScaledWidth = canvas.width;
            let imageScaledHeight = canvas.width * imageAspectRatio;
            ctx.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);
        }
    }
}