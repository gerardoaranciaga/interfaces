class Tablero{

    constructor(context){
        this.context = context;
        this.matrizTablero = [];
        this.filas = 6;
        this.columnas = 7;
        this.inicMatriz();
        this.posiciones = [377,467,557,647,737,827,917];
    }

    inicMatriz(){
        for(let x = 0; x < this.filas; x++){
            this.matrizTablero[x] = [];
            for(let y= 0; y < this.columnas; y++){
                this.matrizTablero[x][y] = -1;
            }
        }
        console.table(this.matrizTablero);
    }
    
    draw(){
        this.context.fillStyle = "rgb(8, 7, 48)";
        this.context.beginPath();
        this.context.fillRect(330,50,640,500);
        this.context.fillRect(250,550,800,50);
        this.context.strokeStyle = "red";
        this.context.lineWidth = 5;
        this.context.strokeRect(330,50,640,500);
        this.context.strokeRect(250,550,800,50);
        this.context.fill();
        this.context.lineWidth = 2;
        this.context.moveTo(250,0);
        this.context.lineTo(250,canvas.height);
        this.context.moveTo(1050,0);
        this.context.lineTo(1050,canvas.height);
        this.context.stroke();
        this.context.closePath();
        let x = 377;
        let y = 93;
        for(let i = 0; i < 6; i++){
            for(let j = 0; j < 7; j++){
                this.context.beginPath();
                this.context.fillStyle = "rgb(255, 255, 255, 1)";
                this.context.arc(x,y,35,0,2*Math.PI);
                this.context.fill();
                this.context.closePath();
                x += 90;
           }
           x = 377;
           y += 83;
        }
        for(let i = 0; i < this.posiciones.length; i++){
            this.context.beginPath();
            this.context.fillStyle = "rgb(50, 50, 50, 1)";
            this.context.arc(this.posiciones[i],30,10,0,2*Math.PI);
            this.context.fill();
            this.context.closePath();
        }
    }







}