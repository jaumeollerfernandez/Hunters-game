class GameObject {
    constructor(config){
        this.isMounted = false;
        this.x= config.x || 0 ; // o escoge el primer valor o el segundo
        this.y= config.y || 0 ;
        this.direction = config.direction || "down";
        this.sprite =  new Sprite({    // imagenes de objetos o personajes
            gameObject: this,
            src: config.src || "images/characters/people/hero.png",
            
        });

        
    }

    mount(map){   /// MÉTODO PARA AÑADIR PAREDES EN EL MAPA SEGUN LAS POSICIONES EN EL EJE X Y
        console.log("mounting");
        this.isMounted = true;
        map.addWall(this.x, this.y);
    }
    update(){

    }

}