class Person extends GameObject{
    constructor(config){
        //Herencia de GameObject.
        super(config);
        //Número de posiciones que quedan por moverse.
        this.movingProgressRemaining = 0;

        // Esto se pone para saber cuál de las clases person es la que controla el jugador. Luego se pondrá en el json con todos los elementos de npc y jugador, y se le dará un true al objeto que controles.
        this.playerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
            "up": ["y",-0.5],
            "down": ["y",0.5],
            "left": ["x",-0.5],
            "right": ["x",0.5]
        }

    }

    update(state){
        //llama al método de nuestra clase.
        this.updatePosition();
        this.updateSprite(state)

        if(this.playerControlled && this.movingProgressRemaining === 0 && state.arrow){
            this.direction = state.arrow;
            // state.map.isSpaceTaken(this.x, this.y, this.direction)
            //Distancia de movimiento cuando ejecuta una acción.
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

    updateSprite(state){
        //En el caso de que no corresponda una arrow en la iteración 16, hará que la animación corresponda a el idle + la última dirección registrada por el usuario
        if(this.playerControlled && this.movingProgressRemaining === 0 && !state.arrow){
            this.sprite.setAnimation("idle-"+this.direction);
        }
        //En caso de que se mueva, seguirá cogiendo la dirección recogida por el evento y le concatena la animación de andar.
        if(this.movingProgressRemaining > 0){
            this.sprite.setAnimation("walk-"+this.direction);
        }
    }
}