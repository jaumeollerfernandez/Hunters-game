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

    // Forma de proteger nuestras variables del constructor, que acceda a lo que se necesite solo.
    get direction(){
        return this.heldDirections[0]
    }

    init(){

        console.log('hola')
        console.log(this.heldDirections)
        // NOTA: Super importante poner keydown y keyup. Keydown es cuando pulsas una tecla, y keyup es cuadno la levantas. Para mantener un máximo de ordenes, se hace mediante el array de arriba.
        document.addEventListener("keydown", e => {
            const dir = this.map[e.code];
            //Es difícil de comprender, pero tiene pinta de que el indexOf mira el primer valor del array, y si es -1 significa que algo no ha ido bien, o que está vacío. 
            //Entonces, le pone la dirección actual en la primera posición, supongo que para que quede "claro" en qué posición está en ese momento.
            if(dir && this.heldDirections.indexOf(dir) === -1){
                this.heldDirections.unshift(dir);
                console.log(this.heldDirections);
            } else{
                console.log('fallaS');
            }
        })
        document.addEventListener("keyup",e => {
            const dir = this.map[e.code];
            const index = this.heldDirections.indexOf(dir);
            if (index > -1){
                this.heldDirections.splice(index, 1);
                console.log(this.heldDirections)
            } else{
                console.log('fallaW');
            }
        })
    }
}