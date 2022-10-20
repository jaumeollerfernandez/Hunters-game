class Questions{
    constructor({text, number, onComplete}){
        this.text = text;
        this.number = number;
        this.onComplete = onComplete;
        this.q1 = new Audio('audio/pregunta2.mp3');
        this.q2 = new Audio('audio/pregunta1.mp3');
        this.q3 = new Audio('audio/pregunta3.mp3');
        this.q4 = new Audio('audio/pregunta4.mp3');
        this.sounds = [this.q1, this.q2, this.q3, this.q4];
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
            `
        )

        this.element.querySelector("button").addEventListener("click", ()=>{
            this.done();
        });

        this.actionListener = new KeyPressListener('Enter',()=>{
            this.actionListener.unbind();
            this.done();
        })

        this.actionListener2 = new KeyPressListener('KeyD',()=>{
            this.actionListener2.unbind();
            this.done();
        })
        this.actionListener3 = new KeyPressListener('KeyF',()=>{
            this.actionListener3.unbind();
            this.done();
        })
        this.actionListener4 = new KeyPressListener('KeyJ',()=>{
            this.actionListener4.unbind();
            this.done();
        })
        this.actionListener5 = new KeyPressListener('KeyK',()=>{
            this.actionListener4.unbind();
            this.done();
        })

    }

    done(){
        this.element.remove();
        this.sounds[this.number].pause();
        this.onComplete();
    }

    init(container){
        this.createElement();
        container.appendChild(this.element);
        this.sounds[this.number].play();
    }
}




