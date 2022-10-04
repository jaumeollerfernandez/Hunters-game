
function StarterFunction(){
    //Aquí se inicia absolutamente todo.

    //Se selecciona el div que contiene el canvas
    const GAMECONTAINER = document.querySelector(".game-container");

    //Se genera la variable que tendrá el objeto Overworld (que será todo)
    const OVERWORLD = new Overworld(GAMECONTAINER);

    //Se inicia el objeto
    OVERWORLD.init();
}

StarterFunction();
