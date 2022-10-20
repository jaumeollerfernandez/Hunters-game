class OverworldMap{
    constructor(config){
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {}; // Paredes para la colisión del personaje
        this.resetsound = false;
        this.alternate_sound = []




       //this.herosteps = false;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc; // capa que va por debajo del personaje (ej, suelo)

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc; //capa que va por arriba (techos)

        this.isCutscenePlaying = false;
    }

    drawLowerImage(ctx){
        ctx.drawImage(this.lowerImage, 0 ,0)
    }

    drawUpperImage(ctx){
        ctx.drawImage(this.upperImage, 0 ,0)
    }

    // saber si un espacio de la cuadricula está ocupado
    isSpaceTaken(currentX, currentY, direction) {
        
        const {x,y} = utils.nextPosition(currentX, currentY, direction);

        return this.walls[`${x},${y}`] || false;
    }

    // steps(){

    // }


    mountObjects() {  // En el mapa por coada objeto que hay, hace la funcion o.mount
        Object.keys(this.gameObjects).forEach(key => {
            //Recogemos la variable Key
            let object = this.gameObjects[key];
            object.id = key;
            //POR  HACER: DETERMINAR SI ESTE OBJETO DEBERÍA MONTARSE

            object.mount(this);
        })
    }

    async startCutscene(events, numerito){
        this.isCutScenePlaying = true;

        for(let i = 0; i<events.length; i++){
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this,
                number: numerito
            })
            await eventHandler.init();
        }

        this.isCutScenePlaying = false;
    }

    checkForActionCutscene(){
        const hero = this.gameObjects["hero"];
        const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
        const match = Object.values(this.gameObjects).find(object =>{
            return `${object.x},${object.y}`=== `${nextCoords.x},${nextCoords.y}`;
        });

        //Condicional para detectar el array de eventos que debe realizar cuando se clica 'Enter'
        if(!this.isCutScenePlaying && match && match.talking.length){
            this.startCutscene(match.talking[0].events)
        }
    }

    // Check Colisiones contra otros objetos (ejemplo, que un personaje atraviese a otro)
    addWall(x,y) {       //añadir paredes (para las colisiones)
        this.walls[`${x},${y}`] = true;


    }
    removeWall(x,y) {                  //quitarlas  (ej, el NPC se va del mapa)
        delete this.walls[`${x},${y}`] // si existe una pared en esta posición se borrará del objeto
    }  

    //El método moveWall es para cuando se mueve un personaje( NPC) y hacer que el protagonista lo trate como una colision
    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);  //borramos la pared de la anterior posición
        const {x,y} = utils.nextPosition(wasX, wasY, direction); //funcion de utils para saber si los cuadros del grid están libres(saber posicion)
        this.addWall(x,y);  //añadimos la pared en la nueva posición

    }

}

///// EN EL OBJETO OVERWORLDMAPS SE DEFINIRÁN TODOS LOS MAPAS DEL JUEGO

window.OverworldMaps={
    DemoRoom: {
        lowerSrc: "/images/maps/lower_background.png",
        upperSrc: "/images/maps/upper_background.png",
       
        gameObjects:{
            
            npc1: new Cinta({
                isPlayerControlled: false ,
                x: utils.withGrid(11),
                y: utils.withGrid(7),
                src:"/images/grabadora.png",
                // behaviorLoop:[
                //     {type:"Questions", text: "pregunta2"}
                // ],
                talking:[
                    {
                        events: [
                            {type:"Questions", text: "prueba1", number:0}, 
                            {type:"Questions", text: "prueba2", number:1},
                            {type:"Questions", text: "prueba3", number:2},
                            {type:"Questions", text: "prueba4", number:3}
                        ]
                    }
                ]
            }),
            npc2: new Enemy({
                isPlayerControlled: false ,
                x: utils.withGrid(16),
                y: utils.withGrid(5),
                src:"/images/characters/people/guard2.png",
                behaviorLoop:[
                    {type:"stand", direction: "down", time: 1000},
                    {type:"walk", direction:"right"},
                    {type:"walk", direction:"right"},
                    {type:"walk", direction:"right"},
                    {type:"stand", direction: "down", time: 1000},
                    {type:"walk", direction:"left"},
                    {type:"walk", direction:"left"},
                    {type:"walk", direction:"left"},
                    {type:"stand", direction: "down", time: 30000}
                ]
            }),

            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(2),
                y: utils.withGrid(9),
                src: "/images/characters/people/personaje1.png"
            })
        },

        walls:{
            //"16,16": true     


            // estos cuadros representan la mesa 
            [utils.asGridCoord(9,5)] : true,  //utils.como las coordenadas del grid (sprite)
            [utils.asGridCoord(10,5)] : true, // cada coordenada X,Y es un cuadro de la cuadrícula del mapa
            [utils.asGridCoord(11,5)] : true,
            [utils.asGridCoord(12,5)] : true,
            [utils.asGridCoord(13,5)] : true,
            [utils.asGridCoord(9,6)]  : true,
            [utils.asGridCoord(10,6)] : true,
            [utils.asGridCoord(11,6)] : true,
            [utils.asGridCoord(12,6)] : true,
            [utils.asGridCoord(13,6)] : true,
            [utils.asGridCoord(9,7)]  : true,
            [utils.asGridCoord(10,7)] : true,
            [utils.asGridCoord(11,7)] : true,
            [utils.asGridCoord(12,7)] : true,
            [utils.asGridCoord(13,7)] : true,
/////////////////   PARED /////////////////////////////////////////////////////////////////////////////////////
            [utils.asGridCoord(0,0)] : true,  //utils.como las coordenadas del grid (sprite)
            [utils.asGridCoord(1,0)] : true, // cada coordenada X,Y es un cuadro de la cuadrícula del mapa
            [utils.asGridCoord(2,0)] : true,
            [utils.asGridCoord(3,0)] : true,
            [utils.asGridCoord(4,0)] : true,
            [utils.asGridCoord(5,0)] : true,
            [utils.asGridCoord(6,0)] : true,
            [utils.asGridCoord(7,0)] : true,
            [utils.asGridCoord(8,0)] : true,
            [utils.asGridCoord(9,0)] : true,
            [utils.asGridCoord(10,0)] : true,
            [utils.asGridCoord(11,0)] : true,
            [utils.asGridCoord(12,0)] : true,  
            [utils.asGridCoord(13,0)] : true, 
            [utils.asGridCoord(14,0)] : true,
            [utils.asGridCoord(15,0)] : true,
            [utils.asGridCoord(16, 0)] : true,
            [utils.asGridCoord(17,0)] : true,
            [utils.asGridCoord(18,0)] : true,
            [utils.asGridCoord(19,0)] : true,
            [utils.asGridCoord(20,0)] : true,
            [utils.asGridCoord(21,0)] : true,
            ///////////////////////////////////////////////////////////////////
            [utils.asGridCoord(0,1)] : true,  //utils.como las coordenadas del grid (sprite)
            [utils.asGridCoord(1,1)] : true, // cada coordenada X,Y es un cuadro de la cuadrícula del mapa
            [utils.asGridCoord(2,1)] : true,
            [utils.asGridCoord(3,1)] : true,
            [utils.asGridCoord(4,1)] : true,
            [utils.asGridCoord(5,1)] : true,
            [utils.asGridCoord(6,1)] : true,
            [utils.asGridCoord(7,1)] : true,
            [utils.asGridCoord(8,1)] : true,
            [utils.asGridCoord(9,1)] : true,
            [utils.asGridCoord(10,1)] : true,
            [utils.asGridCoord(11,1)] : true,
            [utils.asGridCoord(12,1)] : true,  
            [utils.asGridCoord(13,1)] : true, 
            [utils.asGridCoord(14,1)] : true,
            [utils.asGridCoord(15,1)] : true,
            [utils.asGridCoord(16,1)] : true,
            [utils.asGridCoord(17,1)] : true,
            [utils.asGridCoord(18,1)] : true,
            [utils.asGridCoord(19,1)] : true,
            [utils.asGridCoord(20,1)] : true,
            [utils.asGridCoord(21,1)] : true,
            [utils.asGridCoord(0,2)] : true,  //utils.como las coordenadas del grid (sprite)
            [utils.asGridCoord(1,2)] : true, // cada coordenada X,Y es un cuadro de la cuadrícula del mapa
            [utils.asGridCoord(2,2)] : true,
            [utils.asGridCoord(3,2)] : true,
            [utils.asGridCoord(4,2)] : true,
            [utils.asGridCoord(5,2)] : true,
            [utils.asGridCoord(6,2)] : true,
            [utils.asGridCoord(7,2)] : true,
            [utils.asGridCoord(8,2)] : true,
            [utils.asGridCoord(9,2)] : true,
            [utils.asGridCoord(10,2)] : true,
            [utils.asGridCoord(11,2)] : true,
            [utils.asGridCoord(12,2)] : true,  
            [utils.asGridCoord(13,2)] : true, 
            [utils.asGridCoord(14,2)] : true,
            [utils.asGridCoord(15,2)] : true,
            [utils.asGridCoord(16,2)] : true,
            [utils.asGridCoord(17,2)] : true,
            [utils.asGridCoord(18,2)] : true,
            [utils.asGridCoord(19,2)] : true,
            [utils.asGridCoord(20,2)] : true,
            [utils.asGridCoord(21,2)] : true,
            //////////////BORDES DE LA SALA, izquierda//////////////////////
            [utils.asGridCoord(-1,3)]: true,
            [utils.asGridCoord(-1,4)]: true,
            [utils.asGridCoord(-1,5)]: true,
            [utils.asGridCoord(-1,6)]: true,
            [utils.asGridCoord(-1,7)]: true,
            [utils.asGridCoord(-1,8)]: true,
            [utils.asGridCoord(-1,9)]: true,
            [utils.asGridCoord(-1,10)]: true,
            [utils.asGridCoord(-1,11)]: true,
            [utils.asGridCoord(-1,12)]: true,
            //////////////BORDES DE LA SALA, abajo//////////////////////
            [utils.asGridCoord(0,14)]: true,
            [utils.asGridCoord(1,14)]: true,
            [utils.asGridCoord(2,14)]: true,
            [utils.asGridCoord(3,14)]: true,
            [utils.asGridCoord(4,14)]: true,
            [utils.asGridCoord(5,14)]: true,
            [utils.asGridCoord(6,14)]: true,
            [utils.asGridCoord(7,14)]: true,
            [utils.asGridCoord(8,14)]: true,
            [utils.asGridCoord(9,14)]: true,
            [utils.asGridCoord(10,14)]: true,
            [utils.asGridCoord(11,14)]: true,
            [utils.asGridCoord(12,14)]: true,
            [utils.asGridCoord(12,14)]: true,
            [utils.asGridCoord(13,14)]: true,
            [utils.asGridCoord(14,14)]: true,
            [utils.asGridCoord(15,14)]: true,
            [utils.asGridCoord(16,14)]: true,
            [utils.asGridCoord(17,14)]: true,
            [utils.asGridCoord(18,14)]: true,
            [utils.asGridCoord(19,14)]: true,
            [utils.asGridCoord(20,14)]: true,
            [utils.asGridCoord(21,14)]: true,
            [utils.asGridCoord(22,14)]: true,
            ////////////Bordes de la sala, derecha
            [utils.asGridCoord(23,13)]: true,
            [utils.asGridCoord(23,11)]: true,
            [utils.asGridCoord(23,10)]: true,
            [utils.asGridCoord(23,9)]: true,
            [utils.asGridCoord(23,8)]: true,
            [utils.asGridCoord(23,7)]: true,
            [utils.asGridCoord(23,6)]: true,
            [utils.asGridCoord(23,5)]: true,
            [utils.asGridCoord(23,4)]: true,
            [utils.asGridCoord(23,3)]: true,
            [utils.asGridCoord(22,12)]: true,
            [utils.asGridCoord(0,13)]: true

        },
        cutsceneSpaces:{
            [utils.asGridCoord(11,8)]:[
                {type: "textMessage", text: "PREUBA"}
            ]
        }



    },
    Kitchen: {
        lowerSrc: "/images/maps/KitchenLower.png",
        upperSrc: "/images/maps/KitchenUpper.png",
        gameObjects:{
            hero: new GameObject({
                x: 4,
                y: 6,
            }),

            npc1: new GameObject({
                x: 3,
                y: 5,
                src: "/images/characters/people/npc1.png"
            }),

            npc2: new GameObject({
                x: 9,
                y: 4,
                src: "/images/characters/people/npc2.png"
            })

        }
    },
  
}