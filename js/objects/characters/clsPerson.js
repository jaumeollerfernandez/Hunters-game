class Person extends GameObject{
    constructor(config){
        super(config);
        this.movingProgressRemaining = 16;
        this.direction = "up";

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