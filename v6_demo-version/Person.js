class Person extends GameObject{  //Creamos una clase Person a partir de la clase GameObject (herencia) para identificar a las personas del juego
    constructor(config){
        super(config); //Person al ser hererdada de GameObject , el constructor por defecto llama al constructor padre (de GameObject)
        this.movingProgressRemaining = 0;  //Número de posiciones que quedan por moverse.
        this.step1 = document.getElementById('step1');
        this.step2 = document.getElementById('step2');
        this.hero_stepsequence = [this.step1,this.step2];
        this.step_sequence = false;

        this.isPlayerControlled = config.isPlayerControlled || false;   // PAra diferenciar a los NPC del prota
    
        this.directionUpdate = {
            "up": ["y" , -1],  // - , pq va hacia atrás en el eje vertical . Para hacer el movimiento de subir
            "down": ["y" , 1] ,
            "left": ["x" , -1] , // - , pq va hacia atrás en el eje horizontal . 
            "right": ["x" , 1] 
        }

        //this.direction = "right" ;   // En la cls GameObject podemos ver que sino se declara una dirección a la propiedad, irá "down" de forma predeterminada
    }

    update(state) {  //
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {


            // En este caso queremos saber si el teclado está listo y estamos picando una flecha (direccion)
            if (this.isPlayerControlled && state.arrow) {
                //Tendrá relación directa con Overwold Event (la clase)
                this.startBehavior(state, {
                  type: "walk",
                  direction: state.arrow
                })
              }
              this.updateSprite(state);
        }
        
       
 
    }


    startBehavior(state, behavior) {
        // Establecer la dirección del personaje hacia cualquier dirección que tenga
        this.direction = behavior.direction;  //

        if (behavior.type === "walk") {

            //El personaje se para si el espacio no está libre (colision)
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {

                //Si se descomenta esto, puedes ver en console.log la posición en la que se está chocando.
                console.log(this.x/16);
                console.log(this.y/16);

                //Mediante esta condición, solo sonará si se choca en la mesa, ya que las coordenadas de la mesa son sólo estas.
                //Se pueden añadir más condicionantes para diferenciar sonidos, como de pared o de lo que sea, especificando las coordenadas aquí.
                if(this.x/16 >= 9 && this.x/16 <=10 && this.y/16 == 8){
                    document.getElementById('derechagrabadora').play();
                }

                if(this.x/16 >= 12 && this.x/16 <=13 && this.y/16 == 8){
                    document.getElementById('izquierdagrabadora').play();
                }

                if(this.x/16 == 11 && this.y/16 == 8){
                    document.getElementById('encontradagrabadora').play();
                            

                }

                if(this.x/16 >=0 && this.x/16 <= 2 && this.y/16 == 3){
                    document.getElementById('pared').play();
                }
                //puerta 1
                if(this.x/16 >=4 && this.x/16 <= 6 && this.y/16 == 3){
                    document.getElementById('puerta').play();
                }

                //pared enmedio
                if(this.x/16 >=7 && this.x/16 <= 15 && this.y/16 == 3){
                    document.getElementById('pared').play();
                }

                //puerta 2
                if(this.x/16 >=16 && this.x/16 <= 18 && this.y/16 == 3){
                    document.getElementById('puerta').play();
                }

                //Pared

                if(this.x/16 >=19 && this.x/16 <= 21 && this.y/16 == 3){
                    document.getElementById('pared').play();
                }

                //mesa
                if(this.x/16 >=9 && this.x/16 <= 13 && this.y/16 == 4){
                    document.getElementById('mesa').play();

                }
                //lado opuesto mesa
                if(this.x/16 >=9 && this.x/16 <= 13 && this.y/16 == 4){
                    document.getElementById('mesa').play();
                }

                //8x 5-7 y lado izquierdo mesa
                if(this.x/16 ==8  && this.y/16 >= 5 && this.y/16 <= 7){
                    document.getElementById('mesaizq').play();
                }

                //14 7-6-5 y lado derecho mesa
                if(this.x/16 ==14 && this.y/16 >= 5 && this.y/16 <= 7){
                    document.getElementById('mesader').play();
                }

                if(this.x/16 == 22){
                    document.getElementById('susto1').play();
                }

                if(this.x/16 == 0 && this.y/16 != 3){
                    document.getElementById('susto2').play();
                }

                if(this.y/16 == 13){
                    document.getElementById('susto3').play();
                }

                //En caso de que falle y se estampe contra algo, esto provocará que vuelva a intentarlo a los 10 ms.
                behavior.retry && setTimeout(()=>{
                    this.startBehavior(state, behavior)
                },10)

                return;
            }

            //Listo para caminaR  ////////////////////REVISAR CON JAUME///////////////////////
            state.map.moveWall(this.x, this.y, this.direction); // este metodo se encargará de poner una pared en nuestra futura posicion

            //Aquí se alternan los pasos
            if(this.step_sequence == false){
                this.hero_stepsequence[0].play()
                this.step_sequence = true;
            }else{
                this.hero_stepsequence[1].play()
                this.step_sequence = false;

            }
            this.movingProgressRemaining = 16;  //resetea el contador a 16 (PUEDE SER QUE ESTE CONTADOR SE MANTENGA A 16 PARA EVITAR EL MOVIMIENTO DEL PERSONAJE)
            this.updateSprite(state);
            ////////////////////////////////////////////////////////////////////
    
        }

        
        if(behavior.type === "stand"){
            setTimeout( () => {
                utils.emitEvent('PersonStandComplete',{
                    whoId: this.id
                })
            },behavior.time)

        }
    }



    updatePosition(){

        //Si es mayor que cero, actualizará el valor según el movimiento que le digamos en this.direction, y basándose en la variable movingprocessremaining.

        const [property, change] = this.directionUpdate[this.direction];  //this.direction es herdado de GameObject / Property = eje x  o y . Change = 1 o -1
        this[property] += change;
        this.movingProgressRemaining -= 1;  //conforme va avanzando se restan el Nº de Posiciones que quedan por moverse
        
        if(this.movingProgressRemaining === 0){
            //Se detiene. AQUI DEBEREMOS PONER EL TRIGGER DE LA GRABADORA.
            // const event = new CustomEvent('PersonWalkingComplete',{
            //     detail:{
            //         whoId: this.id
            //     }
            // });
            // document.dispatchEvent(event);
            utils.emitEvent('PersonWalkingComplete',{
                whoId: this.id
            })
        }
    }


    //Se actualizan los frames y mirarán según la dirección que tenga el personaje 
    updateSprite(){
        
        // Si el personaje está andando hará el return de andar , sino se dispara el idle
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-"+this.direction); // andando mirando hacia la dirección que se pique por teclado
            return;
        }
        this.sprite.setAnimation("idle-"+this.direction);   //parado mirando a una direccón que se pique por teclado        
    }
}