function function1() {
    var gamecontainer = document.querySelector(".game-container"); 

    
    const OVERWORLD = new Overworld(gamecontainer); // gamecontainer hace referencia a divquecogeelcanvas que está por parámetros en la clase overworld
    
    OVERWORLD.init()
}
var latido = document.getElementById('latido');
latido.play();
var susto1 = document.getElementById('susto1');
var susto1 = document.getElementById('susto2');
var stopaudio = document.getElementById('pregunta1');

stopaudio.pause()
susto1.pause();
susto2.pause();

function1();
