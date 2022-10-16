function function1() {
    var gamecontainer = document.querySelector(".game-container"); 
    var susto1 = document.getElementById('susto1');
    var susto1 = document.getElementById('susto2');
    var stopaudio = document.getElementById('pregunta1');
    var latido = document.getElementById('latido');
    latido.play();
    stopaudio.pause()
    susto1.pause();
    susto2.pause();

    const OVERWORLD = new Overworld(gamecontainer); // gamecontainer hace referencia a divquecogeelcanvas que está por parámetros en la clase overworld

    OVERWORLD.init()
}

function1();