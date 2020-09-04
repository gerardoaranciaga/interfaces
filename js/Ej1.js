let cols = 15;
let rows = 15;

let matriz = [];

let arreglo = [];

for (let i = 0; i < cols; i++) {
    matriz[i] = [];
    for (let j = 0; j < rows; j++) {
        matriz[i][j] = Math.round(Math.random() * 100);
    }
}

function mayor(matriz) {
    let mayor = 0;
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (matriz[i][j] > mayor)
                mayor = matriz[i][j];
        }
    }
    return mayor;
}

function maxYmin(matriz) {
    let maximo = 0;
    let minimo = 9999999999999;
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (j % 2 == 0) {
                if (matriz[i][j] > maximo)
                    maximo = matriz[i][j];
            }
            else {
                if (matriz[i][j] < minimo)
                    minimo = matriz[i][j];
            }
        }
    }
    console.log("Max de fila par: " + maximo);
    console.log("Min de fila impar: " + minimo);
}

function promedio(matriz) {
    let suma = 0;
    let k = 0;
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            suma += matriz[j][i]
        }
        arreglo[k] = suma / rows;
        suma = 0;
        k++;
    }
}

max = mayor(matriz);

console.table(matriz);

console.log("Maximo: " + max);

maxYmin(matriz);

promedio(matriz);

console.table(arreglo);

let ctx = document.querySelector("#canvas").getContext("2d");
/*ctx.fillStyle = "#000000";
ctx.fillRect(250, 25, 150, 100);
ctx.beginPath();
ctx.arc(450, 110, 100, Math.PI * 1 / 2, Math.PI * 3 / 2);
ctx.lineWidth = 15;
ctx.lineCap = 'round';
ctx.strokeStyle = "rgba(255,127,0,1)";
ctx.stroke();
ctx.beginPath();

ctx.fillStyle = "#970000";
ctx.fillRect(450, 350, 200, 100);
ctx.beginPath();*/



let width = 600;
let height = 600;
let imageData = ctx.createImageData(width, height);
let r = 0;
let g = 0;
let b = 0;
let a = 255;

for (x = 0; x < width; x++){
    // 0,0,0 a 255,255,0
    // RGB(inc,inc,0)
    if(x <= width/2){
        let coef = 255/(width/2);
        r = coef * x;
        g = coef * x;
        b = 0;
    }
    // 255,255,0 a 255,0,0
    // RGB(=,dec,0)
    else{
        let coef = 255/(width/2);
        g = (width - x) * coef;
    }
    for (y = 0; y < height; y++){
        
        setPixel(imageData,x,y,r,g,b,a);
    }
}

ctx.putImageData(imageData, 0, 0);

let width2 = 400;
let height2 = 600;
let imageData2 = ctx.createImageData(width2,height2);
let r2 = 0;
let g2 = 0;
let b2 = 0;
let a2 = 255;
//holaaaa
for (y = 0; y < height2; y++){
    // 255,255,255 a 0,0,255
    // RGB(dec,dec,=)
    if(y <= height2/2){
        let coef = 255/(height2/2);
        r2 = ((height2/2) - y) * coef;
        g2 = ((height2/2) - y) * coef;
        b2 = 255;
    }
    // 0,0,255 a 255,0,0
    // RGB(inc,=,dec)
    else{
        let coef = 255/(height2/2);
        r2 = coef * (y - 255);
        b2 = (width - y) * coef;
    }
    for (x = 0; x < width2; x++){
        
        setPixel(imageData2,x,y,r2,g2,b2,a2);
    }
}

ctx.putImageData(imageData2, 600, 0);

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}

console.log(imageData);
