class Overworld{
    //Clase que muesta la parte del mundo
    constructor(config){
        this.element = config; //pasamos variable por aquí
        this.canvas = this.element.querySelector(".game-canvas"); //Seleccionamos el elemento del config que tenga de clase el canvas
        this.ctx = this.canvas.getContext("2d"); //Es una forma de decirle que lo que dibujemos tendrá solo la x y la y (no hay profundidad)
        console.log(this); //Aquí veréis con mas detalle los objetos
    }

    init(){
        const IMAGE = new Image(); //Se crea la clase Image, que hace un return de un <img>
        IMAGE.onload = () =>{
            this.ctx.drawImage(IMAGE,0,0) //Función callback que devuelve la constante en la posición 0,0
        };

        IMAGE.src = "images/maps/DemoLower.png"; //Ruta del archivo png

        const x = 5; //variables para mover el pj
        const y = 6; //variables para mover el pj
        const HERO = new Image();
        HERO.onload = () =>{
            this.ctx.drawImage
            (HERO, //imagen
                0, //x de inicio
                0, //y de inicio
                32, //crop widht. Corta la imagen del sprite de 4x4 que hay para coger solo un pj
                32, //crop height
                x*16 -8, //Recolocación de personaje para que en un 32x32 se coloque en una casilla marcada.
                y*16 -18,
                32, //zoom/scale
                32 //zoom/scale
                );
        }
        HERO.src = "images/characters/people/hero.png" //ruta del archivo png
    }
}