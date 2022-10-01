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
        this.animations = config.animations || {
            idleDown : [[0,0]]
        }

        //Variará según la posición en la que se encuentre.
        this.currentAnimation = config.currentAnimation || "idleDown";
        //Seguramente vaya a ser un contador de dónde está el frame
        this.currentAnimationFrame = 0;

        //
        this.gameObject = config.gameObject;
    }

    draw(ctx){
        //Se hace lo similar a Overworld de dibujar.
        const x = this.gameObject.x *16 -8;
        const y =  this.gameObject.y*16-18;
        
        //Esto se pone porque si no ha hecho la función onload del constructor, hay un problema con el dibujo.
        //Si está cargado (true), entonces dibuja.
        this.isShadowLoaded && ctx.drawImage(this.shadow,x,y)

        this.isLoaded && ctx.drawImage(this.image,
            0,0,
            32,32, // En caso de tener de distintas medidas, jugar con esta variable.
            x,y,
            32,32)
    }
}