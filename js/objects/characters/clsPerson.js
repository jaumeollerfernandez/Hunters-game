class Person extends GameObject{
    constructor(config){
        //Herencia de GameObject.
        super(config);
        //Número de posiciones que quedan por moverse.
        this.movingProgressRemaining = 0;

        // Esto se pone para saber cuál de las clases person es la que controla el jugador. Luego se pondrá en el json con todos los elementos de npc y jugador, y se le dará un true al objeto que controles.
        this.playerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
            "up": ["y",-1],
            "down": ["y",1],
            "left": ["x",-1],
            "right": ["x",1],
        }

    }

    update(state){
        //llama al método de nuestra clase.
        this.updatePosition();

        if(this.playerControlled && this.movingProgressRemaining === 0 && state.arrow){
            this.direction = state.arrow;
            this.movingProgressRemaining = 16;
        }
    }

    updatePosition(){
        //Si es mayor que cero, actualizará el valor según el movimiento que le digamos en this.direction, y basándose en la variable movingprocessremaining.
        if(this.movingProgressRemaining > 0){
            const [property, change] = this.directionUpdate[this.direction] //property será la x o la y, y el change el valor.
            this[property]+=change;
            this.movingProgressRemaining -=1;
        }
    }
}