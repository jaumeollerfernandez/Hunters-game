const utils = {
    withGrid(n){
        return n * 16 ;
    },

    asGridCoord(x , y){     // ver Overworldmap , que es donde se llama al método 
        return `${x*16},${y*16}`  // x= 7 , y = 6   *16 por que es la mitad de 32 . 1 cuadro = 16*16px
    },


    // esta funcion pilla los valores de x y de asGridCoord  para saber si están libres o tienen una pared
    nextPosition(initialX, initialY, direction) { //esta funcion se usa en OverworldMap
        let x = initialX;
        let y = initialY;
        const size = 16;
        if (direction === "left") { 
          x -= size;
        } else if (direction === "right") {
          x += size;
        } else if (direction === "up") {
          y -= size;
        } else if (direction === "down") {
          y += size;
        }
        return {x,y};
    }



    
}