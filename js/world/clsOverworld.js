class Overworld {
    //Clase que muesta la parte del mundo
    constructor(config) {
        this.element = config; //pasamos variable por aquí
        this.canvas = this.element.querySelector(".game-canvas"); //Seleccionamos el elemento del config que tenga de clase el canvas
        this.ctx = this.canvas.getContext("2d"); //Es una forma de decirle que lo que dibujemos tendrá solo la x y la y (no hay profundidad)
        console.log(this); //Aquí veréis con mas detalle los objetos
        this.map = null;
    }
    startGameLoop() {

        //Genera un "bucle infinito" para cada frame que habrá en el juego.
        const step = () => {
            
            
            //Cada inicio de bucle, vuelve a dibujar el canvas de nuevo.
            this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)

            //Dibuja la parte inferior
            this.map.drawLowerImage(this.ctx);

            //Dibuja los personajes.
            Object.values(this.map.gameObjects).forEach(object =>{
                //Este valor tendrá luego los datos necesarios para saber qué deben hacer los personajes en cada momento (update de la posición)
                object.update({
                    //Obtendrá el valor que se ha generado del evento de pulsar la tecla
                    arrow: this.directionInput.direction
                })
                object.sprite.draw(this.ctx);
            })

            //Dibuja la parte superior
            this.map.drawUpperImage(this.ctx)
            //nunca pongas un step() en la posición de este comentario, porque se peta.
            requestAnimationFrame(() => {
                step();
            })
        }
        step();

    }

    init() {

        //Crea el objeto de dirección que indicará qué tecla se está pulsando, y lo inicia.
        this.directionInput = new DirectionInput();
        this.directionInput.init();
        //Se recopila la posición iniciada en el init de arriba, mirando la posición del array [0]
        this.directionInput.direction; //devolverá la dirección.


        //Carga qué mapa se cargará primero.
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom)
        this.startGameLoop();

    };
}