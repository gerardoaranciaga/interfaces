let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let rect = canvas.getBoundingClientRect();
let x = 0; y = 0; dibujando = false; color = "black"; grosor = 1; a = 255;
ctx.lineWidth = 1;
let foto = document.querySelector("#foto");
let imagenauxiliar = "";
let binarizacion = false;
let gris = false;
let imageData = ctx.createImageData(500,500);



function limpiar(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    document.querySelector("#foto").value = "";
    imagenauxiliar = "";
}

function dibujar(e){
    x = e.clientX - rect.left - 4; //el 4 es por el borde de 4px
    y = e.clientY - rect.top - 4;
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

document.querySelector("#negativo").addEventListener("click",function(){
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    for(x = 0; x < canvas.width; x ++){
        for(y = 0; y < canvas.height; y ++){
            let r = getRed(imageData,x,y);
            let g = getGreen(imageData,x,y);
            let b = getBlue(imageData,x,y);
            let r2 = 255 - r;
            let g2 = 255 - g;
            let b2 = 255 - b;
            setPixel(imageData,x,y,r2,g2,b2,a);
        }
    }
    ctx.putImageData(imageData,0,0);
})

document.querySelector("#brillo").addEventListener("click",function(){
    if(imagenauxiliar == ""){
        let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        imagenauxiliar = imageData;
    }
    let indicebrillo = document.querySelector("#brilloinput").value;
    indicebrillo = indicebrillo * 0.05;
    for(x = 0; x < canvas.width; x ++){
        for(y = 0; y < canvas.height; y ++){
            let r = getRed(imagenauxiliar,x,y);
            let g = getGreen(imagenauxiliar,x,y);
            let b = getBlue(imagenauxiliar,x,y);
            let r2 = r * indicebrillo;
            let g2 = g * indicebrillo;
            let b2 = b * indicebrillo;
            setPixel(imageData,x,y,r2,g2,b2,a);
        }
    }
    ctx.putImageData(imageData,0,0);
})

document.querySelector("#binarizacion").addEventListener("click",function(){
    if(binarizacion == false){
        let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        imagenauxiliar = imageData;
        let umbral = 60;
        for(x = 0; x < canvas.width; x ++){
            for(y = 0; y < canvas.height; y ++){
                let r = getRed(imageData,x,y);
                let g = getGreen(imageData,x,y);
                let b = getBlue(imageData,x,y);
                let binario = 0;
                if ((r * 0.3 + g * 0.59 + b * 0.11) > umbral){
                    binario = 255;
                }
                setPixel(imageData,x,y,binario,binario,binario,a);
            }
        }
        binarizacion = true;
        ctx.putImageData(imageData,0,0);
    }else{
        for(x = 0; x < canvas.width; x ++){
            for(y = 0; y < canvas.height; y ++){
                let r = getRed(imagenauxiliar,x,y);
                let g = getGreen(imagenauxiliar,x,y);
                let b = getBlue(imagenauxiliar,x,y);
                setPixel(imageData,x,y,r,g,b,a);
            }
        }
        binarizacion = false;
        ctx.putImageData(imageData,0,0);
    }
})

document.querySelector("#gris").addEventListener("click",function(){
    if(gris == false){
        let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        imagenauxiliar = imageData;
        for(x = 0; x < canvas.width; x ++){
            for(y = 0; y < canvas.height; y ++){
                let r = getRed(imageData,x,y);
                let g = getGreen(imageData,x,y);
                let b = getBlue(imageData,x,y);
                let grey = (r+g+b)/3;
                setPixel(imageData,x,y,grey,grey,grey,a);
            }
        }
        gris = true;
        ctx.putImageData(imageData,0,0);
    }else{
        for(x = 0; x < canvas.width; x ++){
            for(y = 0; y < canvas.height; y ++){
                let r = getRed(imagenauxiliar,x,y);
                let g = getGreen(imagenauxiliar,x,y);
                let b = getBlue(imagenauxiliar,x,y);
                setPixel(imageData,x,y,r,g,b,a);
            }
        }
        gris = false;
        ctx.putImageData(imageData,0,0);
    }
})

function setPixel(imageData,x,y,r,g,b,a){
    index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

function getRed(imageData,x,y){
    index = (x+y*imageData.width)*4;
    return imageData.data[index+0];
}
function getGreen(imageData,x,y){
    index = (x+y*imageData.width)*4;
    return imageData.data[index+1];
}
function getBlue(imageData,x,y){
    index = (x+y*imageData.width)*4;
    return imageData.data[index+2];
}