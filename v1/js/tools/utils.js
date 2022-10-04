const utils = {

    //Facilitará el aspecto mas "matemático" del programa para que se puedan hacer cálculos y posicionamientos más fácil.
    withGrid(n){
        return n *16
    },

    //Parte que determinará dónde están las colisiones
    asGridCoord(x,y){
        return `${x*16},${y*16}`
    }
}