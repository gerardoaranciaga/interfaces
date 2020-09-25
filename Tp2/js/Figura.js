class Figura{
    constructor(posX,posY,fill,context){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
        this.seleccionada = false;
        this.colorSeleccion = "red";
        this.offsetX = 0;
        this.offsetY = 0;
    }

    setFill(fill){
        this.fill = fill;
    }

    setSeleccionadaOn(){
        this.seleccionada = true;
    }
    
    setSeleccionadaOff(){
        this.seleccionada = false;
    }

    getSeleccionada(){
        return this.seleccionada;
    }

    getPosicion(){
        return{
            x: this.getPosX(),
            y: this.getPosY()
        };
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    setPosX(x){
        this.posX = x;
    }

    setPosY(y){
        this.posY = y;
    }

    setPosXY(x,y){
        this.posX = x;
        this.posY = y;
    }

    getFill(){
        return this.fill;
    }

    draw(){
        this.context.fillStyle = this.fill;
    }

    offsetOff(){
        this.posX = this.posX - this.offsetX;
        this.posY = this.posY - this.offsetY;
        this.offsetX = 0;
        this.offsetY = 0;
    }
}