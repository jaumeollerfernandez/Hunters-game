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

            //Dibuja la parte inferior
            this.map.drawLowerImage(this.ctx);

            //Dibuja los personajes.
            Object.values(this.map.gameObjects).forEach(object =>{
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
        //Carga qué mapa se cargará primero.
        this.map = new OverworldMap(window.OverworldMaps.Kitchen)
        this.startGameLoop();

    };
}