class Sprite {
    constructor(config){

    //Imágenes

    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {   //Para comprobar que la imagen se haya cargado ejecutamos el método que tiene la propiedad isLoaded como True
        this.isLoaded = true;
    }

    //Sombras
    this.shadow = new Image();
    this.useShadow = true; // config.useShadow || False   ( para los objs que se quieera usar)
    if (this.useShadow) {
        this.shadow.src = "/images/characters/shadow.png";
    }
    this.shadow.onload = () => {
        this.isShadowLoaded = true;
    }

 
    //Configurar animaciones y estado incial del bichito
        this.animations = config.animations || {
            "idle-down": [[0,0]], //bichito parado
            "idle-right": [[0,1]], //bichito parado mirando derecha
            "idle-up": [[0,2]], //bichito parado mirando arriba
            "idle-left": [[0,3]], //bichito parado mirando izquierda
            "walk-down": [[1,0] ,[0,0], [3,0], [0,0]],  ////matriz que escoge los frames para dar movimiento al caminar
            "walk-right": [[1,1] ,[0,1], [3,1], [0,1]], //caminar derecha
            "walk-up": [[1,2] ,[0,2], [3,2], [0,2]], // caminar arriba
            "walk-left": [[1,3] ,[0,3], [3,3], [0,3]]  // caminar izquierda
        }
        this.currentAnimation = "idle-down" ; //config.currentAnimation ||  "idle-down" ;   //capturar la animación actual
        this.currentAnimationFrame = 0 ;// se muestra qué frame se muestra (posicion del array walkDown)
    
        this.animationFrameLimit= config.animationFrameLimit || 16 ; // tiempo entre frames (del walk-down) (para que se mueva el muñequito) Si es menor, irá más rápido
        this.animationFrameProgress = this.animationFrameLimit ;

        // Referenciar el objeto

        this.gameObject = config.gameObject;

    }

    get frame (){  //enlaza la propiedad de un objeto con una función que será llamada cuando la propiedad es buscada
        return this.animations[this.currentAnimation][this.currentAnimationFrame]
    }

    setAnimation(key){  // comprobar si nuestra animación está cambiando
        if (this.currentAnimation !== key){  // si la animación actual no es igual a la nueva tecla
            this.currentAnimation = key; //la animación actual es igual a la tecla que se está picando
            this.currentAnimationFrame = 0 ; // reset a la posición 0 de la matriz de animaciones (arriba)
            this.animationFrameProgress = this.animationFrameLimit ;
        } 
    
    }

    updateAnimationProgress(){

        //Progreso descendente del frame. Hace un bucle infinito, que va restando el animationFrameLimit

        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        // Resetear el contador
        this.animationFrameProgress = this.animationFrameLimit; // VUELVE A VALER 16
        this.currentAnimationFrame += 1; // suma 1 posicion en la matriz walk-down para que vayan cambiando lso frame sy para que se mueva el bichito
   
        if (this.frame === undefined) {
            this.currentAnimationFrame = 0
        }
    }


    draw(ctx){   // dibuja los objetos
        const x = this.gameObject.x - 8;   // posicion eje horizontal
        const y = this.gameObject.y - 18;  // posicion eje vertical

        
        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y)



        const [frameX, frameY] = this.frame;

       this.isLoaded && ctx.drawImage(this.image,  // si la imagen se ha cargado (true)  se pinta en el contecto ctx 
            frameX * 32,frameY * 32,
            32,32, // corte del frame
            x,y, //posición en la que se va a pintar
            32,32  // tamaño pintado
        )
    
        this.updateAnimationProgress();
    
    }



}