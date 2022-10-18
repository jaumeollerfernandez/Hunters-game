class Questions{
    constructor({text, number,onComplete}){
        this.text = text;
        this.number = number || 1;
        this.onComplete = onComplete;
        this.element = null;
        this.img = "/images/characters/guard.png"
    }
    createElement(){
        this.element = document.createElement('div');
        // this.element2 = document.createElement('div');
        this.element.classList.add("TextMessage");
        // this.element2.classList.add("imgText");

        // this.element.innerHTML = (`
        // <img class="TextMessage_img" src=${this.img}></img>`)
        this.element.innerHTML = (`
            <p>${this.text}</p>
            <button class="TextMessage_button">Next</button>
            <h3> FIN DE LA SIMULACIÓN. GRACIAS POR JUGAR</h3>
            <p> Arrow Studio </p>
            `
        )

        this.element.querySelector("button").addEventListener("click", ()=>{
            this.done();
        });

        this.actionListener = new KeyPressListener('Enter',()=>{
            this.actionListener.unbind();
            this.done();
        })
    }

    done(){
        this.element.remove();
        // this.element2.remove();
        this.onComplete();
    }

    init(container){
        this.createElement();
        container.appendChild(this.element);
    }

    Resuelvepreguntas(){

        //Podría meter un switch? si. Son las cuatro de la mañana y me la suda ya la memoria que pueda usar mi pc? también.

        if(this.number == 1){
            document.getElementById('encontradagrabadora').pause();
            var siguiente = document.getElementById('pregunta1');
            var presiguiente = siguiente.parentNode;

            
            siguiente.play();
            document.addEventListener("keypress" , e =>{
                if (e.key === "D" || e.key === "F" || e.key === "J" || e.key === "K") {        // AQUI HE ESPECIFICADO QUE SI LA TECLA QUE PICO ES ENTER SE REPRODUCIRÁ EL AUDIO
                    siguiente.pause()
                    siguiente.currentTime = 0;
                    presiguiente.removeChild(siguiente)
                    this.done();
                    return;
                }
            })
        }

        if(this.number == 2){
            var siguiente = document.getElementById('pregunta2');
            siguiente.play();
            document.addEventListener("keypress" , e =>{
                if (e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4") {        // AQUI HE ESPECIFICADO QUE SI LA TECLA QUE PICO ES ENTER SE REPRODUCIRÁ EL AUDIO
                siguiente.pause();
                return;
                }
            })
        }

        if(this.number == 3){
            var anterior = document.getElementById('pregunta2');
            var siguiente = document.getElementById('pregunta3');
            anterior.pause()
            siguiente.play();

            document.addEventListener("keypress" , e =>{
                if (e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4") {        // AQUI HE ESPECIFICADO QUE SI LA TECLA QUE PICO ES ENTER SE REPRODUCIRÁ EL AUDIO
                    console.log(e.key);
                    return;
                    }
                    
            })
        }

        if(this.number == 4){
            var anterior = document.getElementById('pregunta3');
            var siguiente = document.getElementById('pregunta4');
            anterior.pause()
            siguiente.play();
            document.addEventListener("keypress" , e =>{
                if (e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4") {        // AQUI HE ESPECIFICADO QUE SI LA TECLA QUE PICO ES ENTER SE REPRODUCIRÁ EL AUDIO
                    console.log(e.key);
                    return;
                    }
            })
        }

        if(this.number == 5){
            var anterior = document.getElementById('pregunta4');
            var siguiente = null;

            document.addEventListener("keypress" , e =>{
                anterior.pause()
                if (e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4") {        // AQUI HE ESPECIFICADO QUE SI LA TECLA QUE PICO ES ENTER SE REPRODUCIRÁ EL AUDIO
                    anterior.pause();
                    if(siguiente != null){
                        siguiente.play();
                    }
                }
            })
        }

        


          

    }
}




