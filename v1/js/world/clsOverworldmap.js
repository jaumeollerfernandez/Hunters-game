class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc; // Esto dibujará el suelo

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc; //Esto dibujará los edificios, tejados, etc.

    }

    drawLowerImage(ctx, pCameraperson) {
        //Ahora el mapa se dibuja teniendo en cuenta las características de la cámara en movimiento.
        ctx.drawImage(
            this.lowerImage,
            utils.withGrid(10.5) - pCameraperson.x,
            utils.withGrid(6) - pCameraperson.y
        );
    }
    drawUpperImage(ctx, pCameraperson) {
        ctx.drawImage(
            this.upperImage,
            utils.withGrid(10.5) - pCameraperson.x,
            utils.withGrid(6) - pCameraperson.y
        );

    }
}
//Todos los mapas que habrán en el juego.

window.OverworldMaps = {
        //Mapa 1
        DemoRoom: {
            lowerSrc: "images/maps/DemoLower.png",
            upperSrc: "images/maps/DemoUpper.png",
            gameObjects: {
                hero: new Person({
                    isPlayerControlled: true,
                    x: utils.withGrid(5),
                    y: utils.withGrid(6),
                    src: "images/characters/people/personaje1_test.png"
                })//,
                // npc1 : new Person({
                //     x: 7,
                //     y: 9,
                //     src:"images/characters/people/npc1.png"
                // })
            }
        },
        HorrorRoom: {
            lowerSrc: "images/maps/main_map/lower_background.png",
            upperSrc: "images/maps/main_map/upper_background.png",
            gameObjects: {
                hero: new Person({
                    isPlayerControlled: true,
                    x: utils.withGrid(5),
                    y: utils.withGrid(6),
                    src: "images/characters/people/personaje1_test.png"
                }),
                camera : new Person({
                    isPlayerControlled: false,
                    x: utils.withGrid(11),
                    y: utils.withGrid(6),
                    src:"a"
                })
                
            }
        },
        // Mapa 2
        Kitchen: {
            lowerSrc: "images/maps/KitchenLower.png",
            upperSrc: "images/maps/KitchenUpper.png",
            gameObjects: {
                hero: new Person({
                    isPlayerControlled: true,
                    x: utils.withGrid(5),
                    y: utils.withGrid(10),
                    src: "images/characters/people/hero.png"
                }),
                npc1: new Person({
                    x: utils.withGrid(4),
                    y: utils.withGrid(5),
                    src: "images/characters/people/npc1.png"
                }),
                npc2: new Person({
                    x: utils.withGrid(7),
                    y: utils.withGrid(5),
                    src: "images/characters/people/npc2.png"
                }),
                npc3: new Person({
                    x: utils.withGrid(9),
                    y: utils.withGrid(6),
                    src: "images/characters/people/npc3.png"
                })
            }
        }
    }