class Circulo extends Figura{
    constructor(posX,posY,radio,fill,context){
        super(posX,posY,fill,context);
        this.radio = radio;
    }

    draw(){
        super.draw();
        this.context.beginPath();
        this.context.arc(this.posX-this.offsetX,this.posY-this.offsetY,this.radio,0,2*Math.PI);
        this.context.fill();
        if(this.seleccionada === true){
            this.context.strokeStyle = this.colorSeleccion;
            this.context.lineWidth = 5;
            this.context.stroke();
        }
        this.context.closePath();
    }

    estaAdentro(x,y){
        let _x = this.posX -x;
        let _y = this.posY -y;
        if(Math.sqrt(_x * _x + _y * _y) < this.radio){
            this.offsetX = x - this.posX;
            this.offsetY = y - this.posY;
            return true;
        }else{
            return false;
        }
    }

    getRadio(){
        return this.radio;
    }
}