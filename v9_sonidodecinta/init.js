function function1() {
    var gamecontainer = document.querySelector(".game-container"); 

    
    const OVERWORLD = new Overworld(gamecontainer); // gamecontainer hace referencia a divquecogeelcanvas que está por parámetros en la clase overworld
    
    OVERWORLD.init()
}

function1();
