class Cinta {
    constructor(config){
        this.id = null
        this.isMounted = false;
        this.x= config.x || 0 ; // o escoge el primer valor o el segundo
        this.y= config.y || 0 ;
        this.direction = config.direction || "down";
        this.sprite =  new Sprite({    // imagenes de objetos o personajes
            gameObject: this,
            src: config.src || "images/characters/people/hero.png",
            
        });
        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;

        this.talking = config.talking || [];
        
    }
    mount(map){   /// MÉTODO PARA AÑADIR PAREDES EN EL MAPA SEGUN LAS POSICIONES EN EL EJE X Y
        console.log("mountingCinta");
        this.isMounted = true;
        map.addWall(this.x, this.y);

        setTimeout(() => {
            this.doBehaviorEvent(map)},10)
            
        
    }
    update(){

    }
    async doBehaviorEvent(map){

        //En caso de que no haya evento, o esté sucediendo uno, corta automáticamente el bucle
        if(map.isCutscenePlaying == true || this.behaviorLoop.length === 0){
            return;
        }

        //preparamos la información del evento
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;

        //Sucede el evento
        const eventHandler = new OverworldEvent({map, event:eventConfig});
        await eventHandler.init();
        this.behaviorLoopIndex +=1;

        //recorremos todo el loop, se vuelve el contador a cero y sigue el código. Se hace para preparar el evento siguiente.
        if(this.behaviorLoopIndex === this.behaviorLoop.length){
            this.behaviorLoopIndex = 0;
        }

        //Vuelve a iterar de nuevo, pero no iterará si no hay más eventos debido a la línea del principio
        this.doBehaviorEvent(map);
    }
}