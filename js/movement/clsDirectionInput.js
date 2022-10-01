class DirectionInput{
    constructor(){

        // Este array controla que la gente que pulse múltiples botones, no tenga reacciones raras
        //en pantalla. Así se hace mas "real" a los videojuegos clásicos.
        this.heldDirections = [];

        this.map = {
            "KeyW": "up",
            "KeyS":"down",
            "KeyA": "left",
            "KeyD" : "right"
        }

    }

    init(){
        document.addEventListener("keyS",e =>{
            const dir = this.map[e.code];
            //Es difícil de comprender, pero tiene pinta de que el indexOf mira el primer valor del array, y si es -1 significa que algo no ha ido bien, o que está vacío. 
            //Entonces, le pone la dirección actual en la primera posición, supongo que para que quede "claro" en qué posición está en ese momento.
            if(dir && this.heldDirections.indexOf(dir)=== -1){
                this.heldDirections.unshift(dir)
            }
        })
        document.addEventListener("KeyW",e =>{
            const dir = this.map[e.code];
            const index = this.heldDirections.indexOf(dir);
            if (index > -1){
                console.log(this.heldDirections);
                this.heldDirections.splice(index, 1);
            }
        })
    }
}