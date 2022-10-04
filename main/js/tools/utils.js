const utils = {

    //Facilitará el aspecto mas "matemático" del programa para que se puedan hacer cálculos y posicionamientos más fácil.
    withGrid(n){
        return n *16
    },
    asGridCoord(x,y){
        return `${x*16},${y*16}`
    },
    nextPosition(initialX,initialY,direction){
        let x = initialX;
        let y = initialY;
        const size = 16;
        switch(direction){
            case ("left") :
                x-=size;
            case ("right"):
                x+=size;
            case("up"):
                y-=size;
            case('down') :
                y +=size;
        }
        return {x,y};
    }
}