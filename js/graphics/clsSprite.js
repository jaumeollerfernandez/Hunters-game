class Sprite{
    constructor(config){
        //cargamos las imágenes-
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () =>{
            //permite saber si se ha cargado la imagen en búfer
            this.isLoaded = true;
        }

        //Sombras
        this.shadow = new Image();
        //Determina si queremos usar sombrea
        this.useShadow = true;
        //En caso de ser así, coge la ruta
        if(this.useShadow){
            this.shadow.src = "images/characters/shadow.png";
        }
        //Hace la función callback para saber si está cargada, para el paso final de dibujar
        this.shadow.onload = () =>{
            //Se determina si se quieren usar sombras o no
            this.isShadowLoaded = true;
        }   


        //En this.animations marcaremos la configuración de los sprites y su posición. Los sprites son matrices, y aquí delimitaremos qué harán en cada caso.
        
        //La matriz es un tanto extraña entorno a cómo itera en la imagen. El segundo valor es el valor de la fila,cuando habitualmente siempre ha sido al revés.
        //Luego nos movemos por las columnas con el primer valor, aunque no acabo de entender cómo lo realiza realmente.
        this.animations = config.animations || {
            "idle-down" : [[0,0]],
            "idle-right" : [[0,1]],
            "idle-up" : [[0,2]],
            "idle-left" : [[0,3]],
            "walk-down" : [[1,0],[0,0],[3,0],[0,0]],
            "walk-right" : [[1,1],[0,1],[3,1],[0,1]],
            "walk-up" : [[1,2],[0,2],[3,2],[0,2]],
            "walk-left" : [[1,3],[0,3],[3,3],[0,3]]
        }

        //Variará según la posición en la que se encuentre.
        this.currentAnimation = "idle-right"; //config.currentAnimation || "idle-down";
        //Seguramente vaya a ser un contador de dónde está el frame
        this.currentAnimationFrame = 0;

        //IMPORTANTE: Aquí marcaremos la velocidad de FRAMES que tiene el programa. Contra más pequeño es el número, más rápido irá.
        this.animationFrameLimit = config.animationFrameLimit ||16;
        this.animationFrameProgress = this.animationFrameLimit; //De forma predeterminada valdrá 16


        //
        this.gameObject = config.gameObject;
    }

    get frame(){
        return this.animations[this.currentAnimation][this.currentAnimationFrame]; // Recoge las variables de this.animations para así recoger los distintos elementos del JSON 
    }

    setAnimation(key){
        //Esta será la variable que determinará el valor de this.currentAnimation.
        if (this.currentAnimation !== key){
            //Es necesario esta condición en caso de que se cambie el valor de key, ya que será el input que le meteremos en los listeners de keydown y keyup.
            this.currentAnimation = key;

            //Resetea los valores para evitar bugs en la animación.
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    //Aquí está limitando los FPS mediante la variable AnimationFrameProgress, aparte de iterar entre las diferentes animaciones puestas en el JSON de arriba (this.animations)
    updateAnimationProgress(){
        // El valor bajará de 16 hacia 0 por cada iteración. ESTO CAPARÁ LOS FPS HASTA 16.
        if (this.animationFrameProgress > 0){
            this.animationFrameProgress -=1;
            return;
        }
        //El motivo de que se cape así es porque irá sumando el Current animation Frame, y así controlamos las iteraciones y que haga la animación correcta todo el rato.

        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame +=1;

        //Esto de aquí controla el último caso en caso de que se produzca un index out of range, vuelve a 0 para volver a iterar y que no dé error.
        if (this.frame === undefined){
            this.currentAnimationFrame = 0;
        }
    }

    draw(ctx){
        //Se hace lo similar a Overworld de dibujar.
        const x = this.gameObject.x-8;
        const y =  this.gameObject.y-18;
        
        const [FRAMEX, FRAMEY] = this.frame;
        // const FRAMEX = this.animations["walk-down"][0][0];
        // const FRAMEY = this.animations["walk-down"][1][0];

        //Esto se pone porque si no ha hecho la función onload del constructor, hay un problema con el dibujo.
        //Si está cargado (true), entonces dibuja.
        this.isShadowLoaded && ctx.drawImage(this.shadow,x,y)

        this.isLoaded && ctx.drawImage(this.image,
            FRAMEX * 32,FRAMEY * 32,
            32,32, // En caso de tener de distintas medidas, jugar con esta variable.
            x,y,
            32,32)

        //Iniciamos la función.
        this.updateAnimationProgress();
    };
}