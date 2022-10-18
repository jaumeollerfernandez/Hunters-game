class DirectionInput{
    constructor(){
        this.heldDirections = [];

        this.mapforKeys = {       //Mapa de teclas y su dirección
            "ArrowUp": "up",
            "ArrowDown": "down",
            "ArrowLeft": "left",
            "ArrowRight": "right",
            "KeyF":"up",     //para gente invidente
            "KeyJ":"down",  //para gente invidente
            "KeyD":"left",  //para gente invidente
            "KeyK":"right", //para gente invidente
           
        }
    }

    get  direction() {
        return this.heldDirections[0];
    }

    init(){
        document.addEventListener("keydown" , e =>{ //Keydown: cuando se pica una tecla (ver: KEYBoARD EVENTS JS)
           // console.log(e.code) // saldrán las teclas que hemos picado por console log
            
            const dir = this.mapforKeys[e.code];   // Validar que la tecla picada del MapforKeys coincide con la direccion
            ///////////////// no sé porqué , pero los pasos se empiezan a oír si piCas primero una letra F,D,J o K (LUEGO YA SE OYEN CON LAS FLECHAS TAMBIÉN)
            // if (this.heldDirections.length >= 0){
            //     document.getElementById('step').play();
            // }else{
            //     document.getElementById('step').pause();
            // }
           
            
            
            //Es difícil de comprender, pero tiene pinta de que el indexOf mira el primer valor del array, y si es -1 significa que algo no ha ido bien, o que está vacío. 
            //Entonces, le pone la dirección actual en la primera posición, supongo que para que quede "claro" en qué posición está en ese momento.
            if (dir && this.heldDirections.indexOf(dir)=== -1){  // En indexof(), si se retorna -1 quiere decir que no hay ningún elemento presente en el array. Por lo tanto, es que si el array está vacío ...
                this.heldDirections.unshift(dir); //unshift inserta un nuevo elemento al inicio del array y devuelve la longitud
                //console.log(this.heldDirections);
            }
        });

        //////ESTA FUNCION SIRVE PARA QUE CUANDO SE DEJE DE PRESIOAR LA TECLA EL PERSONAJE PARE, SINO SE ACUMULAN ARGUMENTOS EN EL ARRAY Y NO PARA (SE SALE DE LA PANTALLA)
        document.addEventListener("keyup" , e =>{
            const dir = this.mapforKeys[e.code]
            const index = this.heldDirections.indexOf(dir);
            if (index >-1){
                this.heldDirections.splice(index, 1); //SPLICE cambia el contenido del array eliminando elementos existentes y/o agregando nuevos
                console.log(this.heldDirections);
            }
        });

////////////////////////// LOS SONIDOS SE REPRODUCIRÁN SI SE PICA EL ENTER//////////////////
        
        //     document.addEventListener("keydown" , e =>{

        //     if (e.key === "Enter") {        // AQUI HE ESPECIFICADO QUE SI LA TECLA QUE PICO ES ENTER SE REPRODUCIRÁ EL AUDIO
        //         document.getElementById('audio1').play();
        //     }else{
        //         document.getElementById('audio1').pause(); // S ES OTRA LETRA EL AUDIO PARA
        //     }
        // })


    }


}