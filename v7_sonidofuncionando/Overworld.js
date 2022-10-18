class Overworld{
    constructor(divquerecogeelcanvas){  // no hace falta llamarlo, se hace solo 
        this.element = divquerecogeelcanvas;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx=this.canvas.getContext("2d"); // el canvas se va a renderizar en 2d
        this.map = null;


    }


    startGameLoop(){    // va a pintar los frames de los personajes pasados unos segundos
        
        const step = () => {       //Genera un "bucle infinito" para cada frame que habrá en el juego.
            
            //Limpiar el rastro que dejan los GameObject después de pintarlos
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  //erases the pixels in a rectangular area by setting them to transparent black.
            //Pintamos la capa de abajo
            this.map.drawLowerImage(this.ctx);
            
            //Pintamos los GameObjects
            Object.values(this.map.gameObjects).forEach(object => {//retorna  un array con los valores de un objeto dado
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                }); 
            })
            
            Object.values(this.map.gameObjects).sort((a,b) =>{
                return a.y - b.y;
            }).forEach(object => {
                object.sprite.draw(this.ctx);
            })
            
            // Pintamos la capa de arrrrriba
            this.map.drawUpperImage(this.ctx);
            
            requestAnimationFrame (() =>{ //Es recurrente ; informa al navegador que quieres realizar una animación y solicita que el navegador programe el repintado de la ventana para el próximo ciclo de animación
                step();
            })
        }
        step();
    }

    bindActionInput(){
        new KeyPressListener("Enter",()=>{
            //Hay algun elemento para interaccionar? Comprueba eso.
            this.map.checkForActionCutscene();
        })
    }

    init() {

        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        //Si clica, iniciará la cinta. Es omegacutre por el hecho de que no afecta a la posición del jugador, pero no he encontrado otra manera de momento.
        // document.addEventListener("keydown" , e =>{
        //     if (e.key === "Enter") {        
        //             this.map.startCutscene([
        //             {type:"Questions", text: "pregunta2"},
        //             ],1)
                    
        //     }})


        this.map.mountObjects();

        //Comprueba si hay eventos para realizar delante tuyo.
        this.bindActionInput();

        this.directionInput = new DirectionInput();
        this.directionInput.init();
      
        this.startGameLoop();


        // this.map.startCutscene([
        //     {type:"Questions", text: "Elige: A, B o C"}
        // ])
    }
}