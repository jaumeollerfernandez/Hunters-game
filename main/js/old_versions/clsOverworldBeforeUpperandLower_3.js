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

        //Ponemos objetos mediante clases

        const HERO = new GameObject({
            x: 5,
            y: 6,
            src:"images/characters/people/hero.png"
        })
        const NPC1 = new GameObject({
            x: 7,
            y: 9,
            src:"images/characters/people/npc1.png"
        })
        
        //Se establece un timeout de 200ms para que dé tiempo a dibujar primero el mapa, y luego los personajes.
        setTimeout( () => {
        HERO.sprite.draw(this.ctx);
        NPC1.sprite.draw(this.ctx);
        },200
        );
    };
};