class Juego{

    constructor(){
        this.matrizTablero = [];
        this.filas = 6;
        this.columnas = 7;
        this.inicMatriz();
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

    insertarFicha(posicion){
        
    }

    getMatrizTablero(){
        return this.matrizTablero;
    }





}